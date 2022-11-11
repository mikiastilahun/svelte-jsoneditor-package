import { SvelteComponentTyped } from "svelte";
import type { JSONPath, JSONValue } from 'immutable-json-patch';
import type { JSONParser, OnFind, OnPasteJson, OnPatch, OnSelect, ValueNormalization } from '../../../types';
declare const __propDef: {
    props: {
        path: JSONPath;
        value: JSONValue;
        parser: JSONParser;
        normalization: ValueNormalization;
        enforceString: boolean;
        onPatch: OnPatch;
        onPasteJson: OnPasteJson;
        onSelect: OnSelect;
        onFind: OnFind;
        focus: () => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type EditableValueProps = typeof __propDef.props;
export declare type EditableValueEvents = typeof __propDef.events;
export declare type EditableValueSlots = typeof __propDef.slots;
export default class EditableValue extends SvelteComponentTyped<EditableValueProps, EditableValueEvents, EditableValueSlots> {
}
export {};
