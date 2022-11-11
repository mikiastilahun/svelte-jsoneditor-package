import { type JSONPatchDocument, type JSONPath, type JSONPointer, type JSONValue } from 'immutable-json-patch';
import type { AfterSelection, CaretPosition, DocumentState, InsideSelection, JSONParser, JSONSelection, KeySelection, MultiSelection, ValueSelection } from '../types.js';
import { SelectionType } from '../types.js';
export declare function isAfterSelection(selection: JSONSelection | undefined): selection is AfterSelection;
export declare function isInsideSelection(selection: JSONSelection | undefined): selection is InsideSelection;
export declare function isKeySelection(selection: JSONSelection | undefined): selection is KeySelection;
export declare function isValueSelection(selection: JSONSelection | undefined): selection is ValueSelection;
export declare function isMultiSelection(selection: JSONSelection | undefined): selection is MultiSelection;
/**
 * Expand a selection start and end into an array containing all paths
 * between (and including) start and end
 */
export declare function expandSelection(json: JSONValue, anchorPath: JSONPath, focusPath: JSONPath): JSONPath[];
export declare function getParentPath(selection: JSONSelection): JSONPath;
export declare function getStartPath(selection: JSONSelection): JSONPath;
export declare function getEndPath(selection: JSONSelection): JSONPath;
export declare function isSelectionInsidePath(selection: JSONSelection, path: JSONPath): boolean;
export declare function isPathInsideSelection(selection: JSONSelection, path: JSONPath, anchorType: string): boolean;
export declare function getSelectionUp(json: JSONValue, documentState: DocumentState, keepAnchorPath?: boolean, useFocusPath?: boolean): JSONSelection | null;
export declare function getSelectionDown(json: JSONValue, documentState: DocumentState, keepAnchorPath?: boolean, useFocusPath?: boolean): JSONSelection | null;
/**
 * Get the next selection for a value inside the current object/array
 * If there is no next value, select AFTER.
 * Only applicable for ValueSelection
 */
export declare function getSelectionNextInside(json: JSONValue, documentState: DocumentState, path: JSONPath): JSONSelection | null;
/**
 * Find the caret position and its siblings for a given selection
 */
export declare function findCaretAndSiblings(json: JSONValue, documentState: DocumentState, includeInside: boolean): {
    next: CaretPosition | null;
    caret: CaretPosition | null;
    previous: CaretPosition | null;
};
export declare function getSelectionLeft(json: JSONValue, documentState: DocumentState, keepAnchorPath?: boolean, includeInside?: boolean): JSONSelection | null;
export declare function getSelectionRight(json: JSONValue, documentState: DocumentState, keepAnchorPath?: boolean, includeInside?: boolean): JSONSelection | null;
/**
 * Get a proper initial selection based on what is visible
 */
export declare function getInitialSelection(json: JSONValue, documentState: DocumentState): JSONSelection;
export declare function createSelectionFromOperations(json: JSONValue, operations: JSONPatchDocument): JSONSelection | null;
export declare function createPointersMap(paths: JSONPath[]): {
    [pointer: JSONPointer]: boolean;
};
export declare function createSinglePointersMap(path: JSONPath): {
    [pointer: JSONPointer]: boolean;
};
/**
 * Find the common path of two paths.
 * For example findCommonRoot(['arr', '1', 'name'], ['arr', '1', 'address', 'contact']) returns ['arr', '1']
 */
export declare function findSharedPath(path1: JSONPath, path2: JSONPath): JSONPath;
export declare function singleItemSelected(selection: JSONSelection | undefined): boolean;
export declare function findRootPath(json: JSONValue, selection: JSONSelection): JSONPath;
export declare function pathStartsWith(path: JSONPath, parentPath: JSONPath): boolean;
export declare function removeEditModeFromSelection(documentState: DocumentState): DocumentState;
export declare function createKeySelection(path: JSONPath, edit: boolean): KeySelection;
export declare function createValueSelection(path: JSONPath, edit: boolean): ValueSelection;
export declare function createInsideSelection(path: JSONPath): InsideSelection;
export declare function createAfterSelection(path: JSONPath): AfterSelection;
export declare function createMultiSelection(json: JSONValue, anchorPath: JSONPath, focusPath: JSONPath): MultiSelection;
/**
 * Turn selected contents into plain text partial JSON, usable for copying to
 * clipboard for example.
 */
export declare function selectionToPartialJson(json: JSONValue, selection: JSONSelection, indentation: number | string | null, parser: JSONParser): string | null;
export declare function getSelectionPaths(selection: JSONSelection | undefined): JSONPath[];
export declare function isEditingSelection(selection: JSONSelection): boolean;
export declare function updateSelectionInDocumentState(documentState: DocumentState, selection: JSONSelection | undefined, replaceIfUndefined?: boolean): DocumentState;
/**
 * Create a selection which selects the whole document
 */
export declare function selectAll(): JSONSelection;
/**
 * Test whether the current selection can be converted.
 * That is the case when the selection is a key/value, or a multi selection with only one path
 */
export declare function canConvert(selection: JSONSelection): boolean;
export declare function fromCaretPosition(caretPosition: CaretPosition): JSONSelection;
export declare function fromSelectionType(json: JSONValue, selectionType: SelectionType, path: JSONPath): JSONSelection;
export declare function selectionIfOverlapping(selection: JSONSelection | undefined, pointer: JSONPointer): JSONSelection | undefined;
