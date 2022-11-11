import { type JSONPatchDocument, type JSONPath, type JSONValue } from 'immutable-json-patch';
import type { ClipboardValues, DragInsideAction, JSONParser, JSONSelection } from '../types';
/**
 * Create a JSONPatch for an insert operation.
 *
 * This function needs the current data in order to be able to determine
 * a unique property name for the inserted node in case of duplicating
 * and object property
 */
export declare function insertBefore(json: JSONValue, path: JSONPath, values: ClipboardValues): JSONPatchDocument;
/**
 * Create a JSONPatch for an append operation. The values will be appended
 * to the end of the array or object.
 *
 * This function needs the current data in order to be able to determine
 * a unique property name for the inserted node in case of duplicating
 * and object property
 */
export declare function append(json: JSONValue, path: JSONPath, values: ClipboardValues): JSONPatchDocument;
/**
 * Rename an object key
 * Not applicable to arrays
 */
export declare function rename(parentPath: JSONPath, keys: string[], oldKey: string, newKey: string): JSONPatchDocument;
/**
 * Create a JSONPatch for an insert operation.
 *
 * This function needs the current data in order to be able to determine
 * a unique property name for the inserted node in case of duplicating
 * and object property
 */
export declare function replace(json: JSONValue, paths: JSONPath[], values: ClipboardValues): JSONPatchDocument;
/**
 * Create a JSONPatch for a duplicate action.
 *
 * This function needs the current data in order to be able to determine
 * a unique property name for the duplicated node in case of duplicating
 * and object property
 */
export declare function duplicate(json: JSONValue, paths: JSONPath[]): JSONPatchDocument;
/**
 * Create a JSONPatch for an extract action.
 */
export declare function extract(json: JSONValue, selection: JSONSelection): JSONPatchDocument;
export declare function insert(json: JSONValue, selection: JSONSelection | undefined, clipboardText: string, parser: JSONParser): JSONPatchDocument;
export declare function moveInsideParent(json: JSONValue, selection: JSONSelection, dragInsideAction: DragInsideAction): JSONPatchDocument;
export declare function createNewValue(json: JSONValue, selection: JSONSelection, valueType: 'object' | 'array' | 'structure' | 'value'): any;
/**
 * Create a JSONPatch for a remove operation
 */
export declare function remove(path: JSONPath): JSONPatchDocument;
/**
 * Create a JSONPatch for a multiple remove operation
 */
export declare function removeAll(paths: JSONPath[]): JSONPatchDocument;
export declare function clipboardToValues(clipboardText: string, parser: JSONParser): ClipboardValues;
export declare function createRemoveOperations(json: JSONValue, selection: JSONSelection): {
    newSelection: JSONSelection;
    operations: JSONPatchDocument;
};
export declare function revertJSONPatchWithMoveOperations(json: JSONValue, operations: JSONPatchDocument): JSONPatchDocument;
