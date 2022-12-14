import { SvelteComponentTyped } from "svelte";
import type { DropdownButtonItem } from '../../types';
declare const __propDef: {
    props: {
        items?: DropdownButtonItem[];
        title?: string | undefined;
        width?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        defaultItem: {};
    };
};
export declare type DropdownButtonProps = typeof __propDef.props;
export declare type DropdownButtonEvents = typeof __propDef.events;
export declare type DropdownButtonSlots = typeof __propDef.slots;
export default class DropdownButton extends SvelteComponentTyped<DropdownButtonProps, DropdownButtonEvents, DropdownButtonSlots> {
}
export {};
