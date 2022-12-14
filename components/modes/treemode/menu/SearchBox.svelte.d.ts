import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        show?: boolean;
        searching: boolean;
        resultCount?: number;
        activeIndex?: number;
        showReplace?: boolean;
        readOnly?: boolean;
        onChange?: (search: string) => void;
        onPrevious?: () => void;
        onNext?: () => void;
        onReplace?: (text: string, replaceText: string) => void;
        onReplaceAll?: (text: string, replaceText: string) => void;
        onClose?: () => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type SearchBoxProps = typeof __propDef.props;
export declare type SearchBoxEvents = typeof __propDef.events;
export declare type SearchBoxSlots = typeof __propDef.slots;
export default class SearchBox extends SvelteComponentTyped<SearchBoxProps, SearchBoxEvents, SearchBoxSlots> {
}
export {};
