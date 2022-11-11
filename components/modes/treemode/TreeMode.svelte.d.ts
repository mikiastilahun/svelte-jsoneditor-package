import { SvelteComponentTyped } from "svelte";
import type { JSONPatchDocument, JSONPath, JSONValue } from 'immutable-json-patch';
import type { AfterPatchCallback, Content, ContentErrors, JSONParser, JSONPatchResult, JSONPathParser, OnBlur, OnChange, OnClassName, OnError, OnFocus, OnRenderMenu, OnRenderValue, SortModalCallback, TransformModalCallback, TransformModalOptions, Validator } from '../../../types';
declare const __propDef: {
    props: {
        readOnly: boolean;
        externalContent: Content;
        mainMenuBar: boolean;
        navigationBar: boolean;
        escapeControlCharacters: boolean;
        escapeUnicodeCharacters: boolean;
        parser: JSONParser;
        validator: Validator | null;
        validationParser: JSONParser;
        pathParser: JSONPathParser;
        indentation: number | string;
        onError: OnError;
        onChange: OnChange;
        onRenderValue: OnRenderValue;
        onRequestRepair: () => void;
        onRenderMenu: OnRenderMenu;
        onClassName: OnClassName | undefined;
        onFocus: OnFocus;
        onBlur: OnBlur;
        onSortModal: (props: SortModalCallback) => void;
        onTransformModal: (props: TransformModalCallback) => void;
        expand?: (callback?: () => boolean) => void;
        validate?: () => ContentErrors;
        getJson?: () => JSONValue;
        patch?: (operations: JSONPatchDocument, afterPatch?: AfterPatchCallback) => JSONPatchResult;
        acceptAutoRepair?: () => {
            json: JSONValue;
            text: string;
        };
        openTransformModal?: ({ id, selectedPath, onTransform, onClose }: TransformModalOptions) => void;
        scrollTo?: (path: JSONPath, scrollToWhenVisible?: boolean) => Promise<void>;
        findElement?: (path: JSONPath) => Element | null;
        focus?: () => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type TreeModeProps = typeof __propDef.props;
export declare type TreeModeEvents = typeof __propDef.events;
export declare type TreeModeSlots = typeof __propDef.slots;
export default class TreeMode extends SvelteComponentTyped<TreeModeProps, TreeModeEvents, TreeModeSlots> {
    get expand(): (callback?: () => boolean) => void;
    get validate(): () => ContentErrors;
    get getJson(): () => JSONValue;
    get patch(): (operations: JSONPatchDocument, afterPatch?: AfterPatchCallback) => JSONPatchResult;
    get acceptAutoRepair(): () => {
        json: JSONValue;
        text: string;
    };
    get openTransformModal(): ({ id, selectedPath, onTransform, onClose }: TransformModalOptions) => void;
    get scrollTo(): (path: JSONPath, scrollToWhenVisible?: boolean) => Promise<void>;
    get findElement(): (path: JSONPath) => Element;
    get focus(): () => void;
}
export {};
