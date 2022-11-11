import { SvelteComponentTyped } from "svelte";
import type { ExtendedSearchResultItem, TreeModeContext } from '../../../types';
import { type JSONSelection } from '../../../types';
import type { JSONPath, JSONPointer } from 'immutable-json-patch';
declare const __propDef: {
    props: {
        path: JSONPath;
        pointer: JSONPointer;
        key: string;
        selection: JSONSelection | undefined;
        searchResultItems: ExtendedSearchResultItem[] | undefined;
        onUpdateKey: (oldKey: string, newKey: string) => string;
        context: TreeModeContext;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type JsonKeyProps = typeof __propDef.props;
export declare type JsonKeyEvents = typeof __propDef.events;
export declare type JsonKeySlots = typeof __propDef.slots;
export default class JsonKey extends SvelteComponentTyped<JsonKeyProps, JsonKeyEvents, JsonKeySlots> {
}
export {};
