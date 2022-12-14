import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        value: number;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type TimestampTagProps = typeof __propDef.props;
export declare type TimestampTagEvents = typeof __propDef.events;
export declare type TimestampTagSlots = typeof __propDef.slots;
export default class TimestampTag extends SvelteComponentTyped<TimestampTagProps, TimestampTagEvents, TimestampTagSlots> {
}
export {};
