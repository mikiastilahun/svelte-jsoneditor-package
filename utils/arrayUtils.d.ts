import type { JSONArray, JSONObject } from 'immutable-json-patch';
/**
 * Comparator to sort an array in ascending order
 *
 * Usage:
 *     [4,2,5].sort(compareAsc)    // [2,4,5]
 */
export declare function compareAsc<T>(a: T, b: T): number;
/**
 * Comparator to sort an array in ascending order
 *
 * Usage:
 *     [4,2,5].sort(compareDesc)   // [5,4,2]
 */
export declare function compareDesc<T>(a: T, b: T): number;
/**
 * Test whether all items of an array are strictly equal
 */
export declare function strictShallowEqual<T>(a: Array<T>, b: Array<T>): boolean;
export declare function compareArrays<T>(a: Array<T>, b: Array<T>): number;
/**
 * Get the paths of all nested properties in the items of an array
 * @param {JSONValue} array
 * @param {boolean} [includeObjects=false] If true, object and array paths are returned as well
 * @return {Path[]}
 */
export declare function getNestedPaths(array: any, includeObjects?: boolean): string[][];
/**
 * Invoke the callback with
 * @param start   Included start index
 * @param end       Excluded end index. End must be larger or equal to start
 * @param iteratee
 */
export declare function forEachIndex(start: number, end: number, iteratee: (index: number) => void): void;
/**
 * Limit the number of items in an array
 */
export declare function limit<T>(array: Array<T>, max: number): Array<T>;
/**
 * Convert an array into an object having the array indices as keys
 */
export declare function arrayToObject(array: JSONArray): JSONObject;
/**
 * Get the values of an object as an array
 */
export declare function objectToArray(object: JSONObject): JSONArray;
/**
 * Test whether an array starts with a sub array
 */
export declare function arrayStartsWith<T>(array: T[], searchArray: T[], equal?: (a: T, b: T) => boolean): boolean;
/**
 * Move a set of items inside an array
 */
export declare function moveItems<T>(array: T[], index: number, count: number, offset: number): T[];
