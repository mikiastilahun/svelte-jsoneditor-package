import { SvelteComponentTyped } from "svelte";
import type { OnChangeQueryLanguage, QueryLanguage } from '../../types';
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
export declare type TransformModalHeaderProps = typeof __propDef.props;
export declare type TransformModalHeaderEvents = typeof __propDef.events;
export declare type TransformModalHeaderSlots = typeof __propDef.slots;
export default class TransformModalHeader extends SvelteComponentTyped<TransformModalHeaderProps, TransformModalHeaderEvents, TransformModalHeaderSlots> {
}
export {};
