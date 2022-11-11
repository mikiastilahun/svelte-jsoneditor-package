import { SvelteComponentTyped } from "svelte";
import type { JSONPath, JSONValue } from 'immutable-json-patch';
import type { OnSort } from '../../types';
declare const __propDef: {
    props: {
        id: string;
        json: JSONValue;
        selectedPath: JSONPath;
        onSort: OnSort;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type SortModalProps = typeof __propDef.props;
export declare type SortModalEvents = typeof __propDef.events;
export declare type SortModalSlots = typeof __propDef.slots;
export default class SortModal extends SvelteComponentTyped<SortModalProps, SortModalEvents, SortModalSlots> {
}
export {};
