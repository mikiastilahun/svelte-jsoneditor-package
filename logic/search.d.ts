import type { JSONPatchDocument, JSONPath, JSONPointer, JSONValue } from 'immutable-json-patch';
import type { DocumentState, ExtendedSearchResultItem, JSONParser, JSONPointerMap, JSONSelection, SearchResult, SearchResultItem } from '../types';
import { SearchField } from '../types.js';
export declare function updateSearchResult(json: JSONValue, newResultItems: SearchResultItem[], previousResult: SearchResult | undefined): SearchResult;
export declare function searchNext(searchResult: SearchResult): SearchResult;
export declare function searchPrevious(searchResult: SearchResult): SearchResult;
export declare function search(searchText: string, json: JSONValue, documentState: DocumentState, maxResults?: number): SearchResultItem[];
/**
 * Do a case-insensitive search for a search text in a text
 */
export declare function findCaseInsensitiveMatches(text: string, searchTextLowerCase: string, path: JSONPath, field: SearchField, onMatch: (searchResultItem: SearchResultItem) => void): void;
/**
 * Replace a search result item with a replacement text
 */
export declare function replaceText(text: string, replacementText: string, start: number, end: number): string;
/**
 * Replace all matches with a replacement text
 */
export declare function replaceAllText(text: string, replacementText: string, occurrences: Array<{
    start: number;
    end: number;
}>): string;
export declare function createSearchAndReplaceOperations(json: JSONValue, documentState: DocumentState, replacementText: string, searchResultItem: SearchResultItem, parser: JSONParser): {
    newSelection: JSONSelection;
    operations: JSONPatchDocument;
};
export declare function createSearchAndReplaceAllOperations(json: JSONValue, documentState: DocumentState, searchText: string, replacementText: string, parser: JSONParser): {
    newSelection: JSONSelection;
    operations: JSONPatchDocument;
};
/**
 * Split the text into separate parts for each search result and the text
 * in between.
 */
export declare function splitValue(text: string, matches: ExtendedSearchResultItem[]): Array<{
    text: string;
    type: 'normal' | 'highlight';
    active: boolean;
}>;
export declare function filterKeySearchResults(map: JSONPointerMap<ExtendedSearchResultItem[]> | undefined, pointer: JSONPointer): ExtendedSearchResultItem[] | undefined;
export declare function filterValueSearchResults(map: JSONPointerMap<ExtendedSearchResultItem[]> | undefined, pointer: JSONPointer): ExtendedSearchResultItem[] | undefined;
