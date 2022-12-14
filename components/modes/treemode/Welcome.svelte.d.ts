import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        readOnly: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type WelcomeProps = typeof __propDef.props;
export declare type WelcomeEvents = typeof __propDef.events;
export declare type WelcomeSlots = typeof __propDef.slots;
export default class Welcome extends SvelteComponentTyped<WelcomeProps, WelcomeEvents, WelcomeSlots> {
}
export {};
