/** @typedef {typeof __propDef.props}  JsonRepairModalProps */
/** @typedef {typeof __propDef.events}  JsonRepairModalEvents */
/** @typedef {typeof __propDef.slots}  JsonRepairModalSlots */
export default class JsonRepairModal extends SvelteComponentTyped<{
    text: any;
    onParse: any;
    onRepair: any;
    onApply: any;
    onRenderMenu: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type JsonRepairModalProps = typeof __propDef.props;
export type JsonRepairModalEvents = typeof __propDef.events;
export type JsonRepairModalSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        text: any;
        onParse: any;
        onRepair: any;
        onApply: any;
        onRenderMenu: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
