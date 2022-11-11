import { SvelteComponentTyped } from "svelte";
import type { JSONValue, JSONPath } from 'immutable-json-patch';
import type { OnPatch } from '../../../types';
declare const __propDef: {
    props: {
        path: JSONPath;
        value: JSONValue;
        readOnly: boolean;
        onPatch: OnPatch;
        focus: () => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type BooleanToggleProps = typeof __propDef.props;
export declare type BooleanToggleEvents = typeof __propDef.events;
export declare type BooleanToggleSlots = typeof __propDef.slots;
export default class BooleanToggle extends SvelteComponentTyped<BooleanToggleProps, BooleanToggleEvents, BooleanToggleSlots> {
}
export {};
