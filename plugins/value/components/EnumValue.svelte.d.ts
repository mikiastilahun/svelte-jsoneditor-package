import { SvelteComponentTyped } from "svelte";
import type { JSONPath, JSONValue } from 'immutable-json-patch';
import type { JSONParser, OnPatch } from '../../../types';
declare const __propDef: {
    props: {
        path: JSONPath;
        value: JSONValue;
        parser: JSONParser;
        readOnly: boolean;
        isSelected: boolean;
        onPatch: OnPatch;
        options: {
            value: unknown;
            text: string;
        }[];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type EnumValueProps = typeof __propDef.props;
export declare type EnumValueEvents = typeof __propDef.events;
export declare type EnumValueSlots = typeof __propDef.slots;
export default class EnumValue extends SvelteComponentTyped<EnumValueProps, EnumValueEvents, EnumValueSlots> {
}
export {};
