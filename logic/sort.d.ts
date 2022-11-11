import type { JSONValue, JSONPatchDocument, JSONPath } from 'immutable-json-patch';
export declare function caseInsensitiveNaturalCompare(a: any, b: any): any;
/**
 * Sort the keys of an object
 * @param json           The the JSON containg the (optionally nested)
 *                       object to be sorted
 * @param [rootPath=[]]  Relative path when the array was located
 * @param [direction=1]  Pass 1 to sort ascending, -1 to sort descending
 * @return               Returns a JSONPatch document with move operation
 *                       to get the array sorted.
 */
export declare function sortObjectKeys(json: JSONValue, rootPath?: JSONPath, direction?: 1 | -1): JSONPatchDocument;
/**
 * Sort the items of an array
 * @param json               The document containing (optionally nested)
 *                           the array to be sorted.
 * @param [rootPath=[]]      Relative path when the array was located
 * @param [propertyPath=[]]  Nested path to the property on which to sort the contents
 * @param [direction=1]      Pass 1 to sort ascending, -1 to sort descending
 * @return                   Returns a JSONPatch document with move operation
 *                           to get the array sorted.
 */
export declare function sortArray(json: JSONValue, rootPath?: JSONPath, propertyPath?: JSONPath, direction?: 1 | -1): JSONPatchDocument;
/**
 * Create an a list with JSON Patch move operations
 * needed to sort the array contents.
 * @param {Array} array
 * @param {function (a, b) : number} comparator
 * @return {Array.<{ op: 'move', from: string, path: string }>}
 */
export declare function sortOperationsMove(array: any, comparator: any): any[];
/**
 * Create an array containing all move operations
 * needed to sort the array contents.
 * @param {Array} array
 * @param {function (a, b) : number} comparator
 * @return {Array.<{ op: 'move', from: string, path: string }>}
 */
export declare function sortOperationsMoveAdvanced(array: any, comparator: any): {
    op: string;
    from: string;
    path: string;
}[];
/**
 * Fast solution to apply many JSON patch move operations inside a single array,
 * like applying all moves needed to sort an array.
 *
 * Throws an error when not all operations are move operation inside the same
 * array.
 *
 * @param {JSON} json
 * @param {JSONPatchDocument} operations
 * @returns {JSON}
 */
export declare function fastPatchSort(json: any, operations: any): any;
