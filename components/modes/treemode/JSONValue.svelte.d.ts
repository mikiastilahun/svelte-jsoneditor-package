import { SvelteComponentTyped } from "svelte";
import type { SearchResultItem, JSONSelection, TreeModeContext } from '../../../types';
import type { JSONValue, JSONPath } from 'immutable-json-patch';
declare const __propDef: {
    props: {
        path: JSONPath;
        value: JSONValue;
        context: TreeModeContext;
        isSelected: boolean;
        enforceString: boolean;
        selection: JSONSelection | undefined;
        searchResultItems: SearchResultItem[] | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type JsonValueProps = typeof __propDef.props;
export declare type JsonValueEvents = typeof __propDef.events;
export declare type JsonValueSlots = typeof __propDef.slots;
export default class JsonValue extends SvelteComponentTyped<JsonValueProps, JsonValueEvents, JsonValueSlots> {
}
export {};
