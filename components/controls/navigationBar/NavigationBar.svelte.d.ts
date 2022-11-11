import { SvelteComponentTyped } from "svelte";
import type { JSONValue } from 'immutable-json-patch';
import type { DocumentState, JSONPathParser, OnError, OnSelect } from '../../../types';
declare const __propDef: {
    props: {
        json: JSONValue;
        documentState: DocumentState;
        onSelect: OnSelect;
        onError: OnError;
        pathParser: JSONPathParser;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type NavigationBarProps = typeof __propDef.props;
export declare type NavigationBarEvents = typeof __propDef.events;
export declare type NavigationBarSlots = typeof __propDef.slots;
export default class NavigationBar extends SvelteComponentTyped<NavigationBarProps, NavigationBarEvents, NavigationBarSlots> {
}
export {};
