import { SvelteComponentTyped } from "svelte";
import type { QueryLanguage, OnChangeQueryLanguage } from '../../../types';
declare const __propDef: {
    props: {
        queryLanguages: QueryLanguage[];
        queryLanguageId: string;
        onChangeQueryLanguage: OnChangeQueryLanguage;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type SelectQueryLanguageProps = typeof __propDef.props;
export declare type SelectQueryLanguageEvents = typeof __propDef.events;
export declare type SelectQueryLanguageSlots = typeof __propDef.slots;
export default class SelectQueryLanguage extends SvelteComponentTyped<SelectQueryLanguageProps, SelectQueryLanguageEvents, SelectQueryLanguageSlots> {
}
export {};
