import { SvelteComponentTyped } from "svelte";
import type { ValidationError } from '../../types';
declare const __propDef: {
    props: {
        validationErrors: ValidationError[];
        selectError: (error: ValidationError) => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type ValidationErrorsOverviewProps = typeof __propDef.props;
export declare type ValidationErrorsOverviewEvents = typeof __propDef.events;
export declare type ValidationErrorsOverviewSlots = typeof __propDef.slots;
export default class ValidationErrorsOverview extends SvelteComponentTyped<ValidationErrorsOverviewProps, ValidationErrorsOverviewEvents, ValidationErrorsOverviewSlots> {
}
export {};
