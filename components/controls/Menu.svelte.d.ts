import { SvelteComponentTyped } from "svelte";
import type { MenuItem } from '../../types';
declare const __propDef: {
    props: {
        items?: MenuItem[];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        left: {};
        right: {};
    };
};
export declare type MenuProps = typeof __propDef.props;
export declare type MenuEvents = typeof __propDef.events;
export declare type MenuSlots = typeof __propDef.slots;
export default class Menu extends SvelteComponentTyped<MenuProps, MenuEvents, MenuSlots> {
}
export {};
