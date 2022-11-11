import { SvelteComponentTyped } from "svelte";
import type { ExtendedSearchResultItem } from '../../../../types';
declare const __propDef: {
    props: {
        text: string;
        searchResultItems: ExtendedSearchResultItem[];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type SearchResultHighlighterProps = typeof __propDef.props;
export declare type SearchResultHighlighterEvents = typeof __propDef.events;
export declare type SearchResultHighlighterSlots = typeof __propDef.slots;
export default class SearchResultHighlighter extends SvelteComponentTyped<SearchResultHighlighterProps, SearchResultHighlighterEvents, SearchResultHighlighterSlots> {
}
export {};
