import type { JSONPath } from 'immutable-json-patch';
/**
 * Stringify a path like:
 *
 *     ["data", "2", "nested property", "name"]
 *
 * into a JSON path string like:
 *
 *     "$.data[2]['nested property'].name"
 */
export declare function stringifyJSONPath(path: JSONPath): string;
/**
 * Stringify a single property of a JSON path. See also stringifyJSONPath
 */
export declare function stringifyJSONPathProp(prop: string): string;
/**
 * Strip the leading '$' and '.' from a JSONPath, for example:
 *
 *   "$.data[2].nested.property"
 *
 * will be changed into:
 *
 *   "data[2].nested.property"
 *
 * See also prependRootObject
 */
export declare function stripRootObject(path: string): string;
/**
 * Add $ and . at the start of a JSON path when missing
 * This is the opposite of stripRootObject
 */
export declare function prependRootObject(path: string): string;
/**
 * Parse a string into a JSONPath. For example the input:
 *
 *   "$.data[2]['nested property'].name"
 *
 * will return:
 *
 *   ["data", "2", "nested property", "name"]
 *
 */
export declare function parseJSONPath(path: string): JSONPath;
/**
 * Convert a JSONPath into an option for use in a select box
 */
export declare function pathToOption(path: JSONPath): {
    value: JSONPath;
    label: string;
};
/**
 * Stringify a JSON path into a lodash path like:
 *
 *     "data[2].nested.name"
 *
 * or
 *
 *     ["data", 2, "nested property", "name"]
 */
export declare function createLodashPropertySelector(path: JSONPath): string;
/**
 * Create a JavaScript property selector
 *
 * Turn a paths like:
 *
 *   ['location', 'latitude']
 *   ['address', 'full name']
 *
 * into a JavaScript selector (string) like:
 *
 *   '?.location?.latitude'
 *   '?.address?.["full name"]'
 */
export declare function createPropertySelector(path: JSONPath): string;
/**
 * Create a memoized function that will memoize the input path, and return
 * the memoized instance of the path when the stringified version is the same.
 */
export declare function createMemoizePath(): (path: JSONPath) => JSONPath;
