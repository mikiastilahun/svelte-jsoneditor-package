import { isObject } from './typeUtils.js';
import { toSafeNumberOrThrow } from 'lossless-json';
/**
 * Convert a JSON document containing non-primitive values like LosslessNumber
 * or bigint into a plain JSON document with just numbers.
 */
export function convertToJSON(value, convertValue = defaultConvertValue) {
    if (isJavaScriptObject(value)) {
        return convertObjectToJSON(value);
    }
    if (isJavaScriptArray(value)) {
        return convertArrayToJSON(value);
    }
    return convertValue(value);
}
function convertObjectToJSON(object) {
    const converted = {};
    for (const key in object) {
        converted[key] = convertToJSON(object[key]);
    }
    return converted;
}
function convertArrayToJSON(array) {
    return array.map((item) => convertToJSON(item));
}
function isJavaScriptObject(value) {
    return isObject(value);
}
function isJavaScriptArray(value) {
    return Array.isArray(value);
}
function defaultConvertValue(value) {
    if (value === null ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        typeof value === 'string') {
        return value;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (value && value.isLosslessNumber) {
        return toSafeNumberOrThrow(value.toString(), { approx: true });
    }
    if (typeof value === 'bigint') {
        const num = Number(value);
        if (!Number.isSafeInteger(num)) {
            throw new Error('Cannot safely convert to number: ' + `the value ${value} would truncate and become ${num}`);
        }
        return num;
    }
    return value?.valueOf();
}
