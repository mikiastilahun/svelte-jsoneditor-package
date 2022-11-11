import { SvelteComponentTyped } from "svelte";
import type { JSONPath } from 'immutable-json-patch';
declare const __propDef: {
    props: {
        path: JSONPath;
        index: number;
        onSelect: (path: JSONPath) => void;
        getItems: (path: JSONPath) => string[];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type NavigationBarItemProps = typeof __propDef.props;
export declare type NavigationBarItemEvents = typeof __propDef.events;
export declare type NavigationBarItemSlots = typeof __propDef.slots;
export default class NavigationBarItem extends SvelteComponentTyped<NavigationBarItemProps, NavigationBarItemEvents, NavigationBarItemSlots> {
}
export {};
