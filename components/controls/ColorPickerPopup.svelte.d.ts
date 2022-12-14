import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        color: string;
        onChange: (newColor: string) => void;
        showOnTop: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type ColorPickerPopupProps = typeof __propDef.props;
export declare type ColorPickerPopupEvents = typeof __propDef.events;
export declare type ColorPickerPopupSlots = typeof __propDef.slots;
export default class ColorPickerPopup extends SvelteComponentTyped<ColorPickerPopupProps, ColorPickerPopupEvents, ColorPickerPopupSlots> {
}
export {};
