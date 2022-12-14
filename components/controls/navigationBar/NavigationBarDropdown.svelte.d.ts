import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        items: (string | number)[];
        selectedItem: string | number;
        onSelect: (item: string | number) => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type NavigationBarDropdownProps = typeof __propDef.props;
export declare type NavigationBarDropdownEvents = typeof __propDef.events;
export declare type NavigationBarDropdownSlots = typeof __propDef.slots;
export default class NavigationBarDropdown extends SvelteComponentTyped<NavigationBarDropdownProps, NavigationBarDropdownEvents, NavigationBarDropdownSlots> {
}
export {};
