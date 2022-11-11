import type { JavaScriptValue, JSONValue } from 'lossless-json';
/**
 * Convert a JSON document containing non-primitive values like LosslessNumber
 * or bigint into a plain JSON document with just numbers.
 */
export declare function convertToJSON(value: JavaScriptValue, convertValue?: (value: JavaScriptValue) => JSONValue): JSONValue;
