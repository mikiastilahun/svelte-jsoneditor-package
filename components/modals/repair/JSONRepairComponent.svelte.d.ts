import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        text?: string;
        readOnly?: boolean;
        onParse: any;
        onRepair: any;
        onChange?: any;
        onApply: any;
        onCancel: any;
        onRenderMenu?: (...args: any[]) => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type JsonRepairComponentProps = typeof __propDef.props;
export declare type JsonRepairComponentEvents = typeof __propDef.events;
export declare type JsonRepairComponentSlots = typeof __propDef.slots;
export default class JsonRepairComponent extends SvelteComponentTyped<JsonRepairComponentProps, JsonRepairComponentEvents, JsonRepairComponentSlots> {
}
export {};
