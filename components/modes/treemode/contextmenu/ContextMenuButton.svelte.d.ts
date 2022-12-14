import { SvelteComponentTyped } from "svelte";
import type { OnContextMenu } from '../../../../types';
declare const __propDef: {
    props: {
        selected: boolean;
        onContextMenu: OnContextMenu;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type ContextMenuButtonProps = typeof __propDef.props;
export declare type ContextMenuButtonEvents = typeof __propDef.events;
export declare type ContextMenuButtonSlots = typeof __propDef.slots;
export default class ContextMenuButton extends SvelteComponentTyped<ContextMenuButtonProps, ContextMenuButtonEvents, ContextMenuButtonSlots> {
}
export {};
