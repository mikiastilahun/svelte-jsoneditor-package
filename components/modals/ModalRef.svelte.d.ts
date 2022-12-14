import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        open?: any;
        close?: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type ModalRefProps = typeof __propDef.props;
export declare type ModalRefEvents = typeof __propDef.events;
export declare type ModalRefSlots = typeof __propDef.slots;
export default class ModalRef extends SvelteComponentTyped<ModalRefProps, ModalRefEvents, ModalRefSlots> {
    get open(): any;
    get close(): any;
}
export {};
