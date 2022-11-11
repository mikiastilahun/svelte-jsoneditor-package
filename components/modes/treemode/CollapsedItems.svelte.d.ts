import { SvelteComponentTyped } from "svelte";
import type { Section, JSONSelection, VisibleSection } from '../../../types';
import type { JSONPath, JSONPointer } from 'immutable-json-patch';
declare const __propDef: {
    props: {
        visibleSections: VisibleSection[];
        sectionIndex: number;
        total: number;
        path: JSONPath;
        pointer: JSONPointer;
        selection: JSONSelection | undefined;
        onExpandSection: (path: JSONPath, section: Section) => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type CollapsedItemsProps = typeof __propDef.props;
export declare type CollapsedItemsEvents = typeof __propDef.events;
export declare type CollapsedItemsSlots = typeof __propDef.slots;
export default class CollapsedItems extends SvelteComponentTyped<CollapsedItemsProps, CollapsedItemsEvents, CollapsedItemsSlots> {
}
export {};
