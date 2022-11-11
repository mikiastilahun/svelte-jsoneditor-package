import { SvelteComponentTyped } from "svelte";
import type { ExtendedSearchResultItem, JSONParser, JSONPath, JSONValue, OnSelect, ValueNormalization } from '../../../types';
declare const __propDef: {
    props: {
        path: JSONPath;
        value: JSONValue;
        readOnly: boolean;
        normalization: ValueNormalization;
        parser: JSONParser;
        onSelect: OnSelect;
        searchResultItems: ExtendedSearchResultItem[] | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type ReadonlyValueProps = typeof __propDef.props;
export declare type ReadonlyValueEvents = typeof __propDef.events;
export declare type ReadonlyValueSlots = typeof __propDef.slots;
export default class ReadonlyValue extends SvelteComponentTyped<ReadonlyValueProps, ReadonlyValueEvents, ReadonlyValueSlots> {
}
export {};
