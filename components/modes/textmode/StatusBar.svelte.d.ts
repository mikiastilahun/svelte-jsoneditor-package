import { SvelteComponentTyped } from "svelte";
import type { EditorState } from '@codemirror/state';
declare const __propDef: {
    props: {
        editorState: EditorState | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type StatusBarProps = typeof __propDef.props;
export declare type StatusBarEvents = typeof __propDef.events;
export declare type StatusBarSlots = typeof __propDef.slots;
export default class StatusBar extends SvelteComponentTyped<StatusBarProps, StatusBarEvents, StatusBarSlots> {
}
export {};
