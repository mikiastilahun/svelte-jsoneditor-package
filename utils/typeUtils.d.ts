import type { JSONParser } from '../types.js';
/**
 * Test whether a value is an Object (and not an Array or Class)
 */
export declare function isObject(value: unknown): value is Record<string, unknown>;
/**
 * Test whether a value is an Object or an Array (and not a Class)
 */
export declare function isObjectOrArray(value: unknown): value is Object | Array<unknown>;
/**
 * Test whether a value is a boolean
 *
 * @param {*} value
 * @return {boolean}
 */
export declare function isBoolean(value: unknown): value is boolean;
/**
 * Test whether a value is a timestamp in milliseconds after the year 2000.
 */
export declare function isTimestamp(value: unknown): boolean;
/**
 * Get the applied color given a color name or code
 * Returns the color if the input is a valid color, and returns null otherwise.
 *
 * Example output:
 *
 *     'rgba(255,0,0,0.7)' or 'rgb(255,0,0)'
 *
 * Source: https://stackoverflow.com/questions/6386090/validating-css-color-names/33184805
 */
export declare function getColorCSS(color: string): string | null;
/**
 * Test if a string contains a valid color name or code.
 * Returns true if a valid color, false otherwise
 */
export declare function isColor(value: unknown): boolean;
/**
 * Get the type of the value
 */
export declare function valueType(value: unknown, parser: JSONParser): string;
export declare function isUrl(text: unknown): boolean;
/**
 * Convert contents of a string to the correct JSON type. This can be a string,
 * a number, a boolean, etc
 */
export declare function stringConvert(str: string, parser: JSONParser): unknown;
/**
 * Test whether a string contains a numeric, boolean, or null value.
 * Returns true when the string contains a number, boolean, or null.
 */
export declare function isStringContainingPrimitiveValue(str: unknown, parser: JSONParser): boolean;
/**
 * Test whether a string contains an integer number
 */
export declare function isInteger(value: string): boolean;
