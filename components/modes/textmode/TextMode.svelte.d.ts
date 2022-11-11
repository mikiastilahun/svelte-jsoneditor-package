import { SvelteComponentTyped } from "svelte";
import type { JSONPatchDocument } from 'immutable-json-patch';
import type { Content, ContentErrors, JSONParser, JSONPatchResult, OnBlur, OnChange, OnError, OnFocus, OnRenderMenu, SortModalCallback, TransformModalCallback, Validator } from '../../../types';
declare const __propDef: {
    props: {
        readOnly: boolean;
        mainMenuBar: boolean;
        statusBar: boolean;
        externalContent: Content;
        indentation: number | string;
        tabSize: number;
        escapeUnicodeCharacters: boolean;
        parser: JSONParser;
        validator: Validator | null;
        validationParser: JSONParser;
        onChange: OnChange;
        onSwitchToTreeMode: () => void;
        onError: OnError;
        onFocus: OnFocus;
        onBlur: OnBlur;
        onRenderMenu: OnRenderMenu;
        onSortModal: (props: SortModalCallback) => void;
        onTransformModal: (props: TransformModalCallback) => void;
        focus?: () => void;
        patch?: (operations: JSONPatchDocument) => JSONPatchResult;
        openTransformModal?: ({ id, selectedPath, onTransform, onClose }: {
            id: any;
            selectedPath: any;
            onTransform: any;
            onClose: any;
        }) => void;
        refresh?: () => void;
        validate?: () => ContentErrors;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type TextModeProps = typeof __propDef.props;
export declare type TextModeEvents = typeof __propDef.events;
export declare type TextModeSlots = typeof __propDef.slots;
export default class TextMode extends SvelteComponentTyped<TextModeProps, TextModeEvents, TextModeSlots> {
    get focus(): () => void;
    get patch(): (operations: JSONPatchDocument) => JSONPatchResult;
    get openTransformModal(): ({ id, selectedPath, onTransform, onClose }: {
        id: any;
        selectedPath: any;
        onTransform: any;
        onClose: any;
    }) => void;
    get refresh(): () => void;
    get validate(): () => ContentErrors;
}
export {};
