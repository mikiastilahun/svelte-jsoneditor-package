import { SvelteComponentTyped } from "svelte";
import type { JSONValue } from 'immutable-json-patch';
import type { DocumentState, JSONParser } from '../../../../types';
declare const __propDef: {
    props: {
        json: JSONValue;
        documentState: DocumentState;
        parser: JSONParser;
        showTip: any;
        onCloseContextMenu: any;
        onEditKey: any;
        onEditValue: any;
        onToggleEnforceString: any;
        onCut: any;
        onCopy: any;
        onPaste: any;
        onRemove: any;
        onDuplicate: any;
        onExtract: any;
        onInsertBefore: any;
        onInsert: any;
        onConvert: any;
        onInsertAfter: any;
        onSort: any;
        onTransform: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type ContextMenuProps = typeof __propDef.props;
export declare type ContextMenuEvents = typeof __propDef.events;
export declare type ContextMenuSlots = typeof __propDef.slots;
export default class ContextMenu extends SvelteComponentTyped<ContextMenuProps, ContextMenuEvents, ContextMenuSlots> {
}
export {};
