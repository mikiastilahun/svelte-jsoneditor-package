import { SvelteComponentTyped } from "svelte";
import type { PopupEntry } from '../../../types';
declare const __propDef: {
    props: {
        popup: PopupEntry;
        closeAbsolutePopup: (popupId: number) => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type AbsolutePopupEntryProps = typeof __propDef.props;
export declare type AbsolutePopupEntryEvents = typeof __propDef.events;
export declare type AbsolutePopupEntrySlots = typeof __propDef.slots;
export default class AbsolutePopupEntry extends SvelteComponentTyped<AbsolutePopupEntryProps, AbsolutePopupEntryEvents, AbsolutePopupEntrySlots> {
}
export {};
