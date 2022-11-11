import { SvelteComponentTyped } from "svelte";
import type { JSONPath, JSONValue } from 'immutable-json-patch';
import type { JSONParser, OnChangeQueryLanguage, OnClassName, OnPatch, OnRenderValue, QueryLanguage } from '../../types';
declare const __propDef: {
    props: {
        id?: string;
        json: JSONValue;
        selectedPath?: JSONPath;
        escapeControlCharacters: boolean;
        escapeUnicodeCharacters: boolean;
        parser: JSONParser;
        queryLanguages: QueryLanguage[];
        queryLanguageId: string;
        onChangeQueryLanguage: OnChangeQueryLanguage;
        onRenderValue: OnRenderValue;
        onClassName: OnClassName;
        onTransform: OnPatch;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type TransformModalProps = typeof __propDef.props;
export declare type TransformModalEvents = typeof __propDef.events;
export declare type TransformModalSlots = typeof __propDef.slots;
export default class TransformModal extends SvelteComponentTyped<TransformModalProps, TransformModalEvents, TransformModalSlots> {
}
export {};
