import { SvelteComponentTyped } from "svelte";
import type { OnRenderMenu, JSONSelection } from '../../../../types';
import type { JSONValue } from 'immutable-json-patch';
import type { HistoryState } from '../../../../logic/history';
declare const __propDef: {
    props: {
        json: JSONValue;
        selection: JSONSelection | undefined;
        readOnly: boolean;
        showSearch?: boolean;
        historyState: HistoryState;
        onExpandAll: any;
        onCollapseAll: any;
        onUndo: any;
        onRedo: any;
        onSort: any;
        onTransform: any;
        onContextMenu: any;
        onCopy: any;
        onRenderMenu?: OnRenderMenu;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type TreeMenuProps = typeof __propDef.props;
export declare type TreeMenuEvents = typeof __propDef.events;
export declare type TreeMenuSlots = typeof __propDef.slots;
export default class TreeMenu extends SvelteComponentTyped<TreeMenuProps, TreeMenuEvents, TreeMenuSlots> {
}
export {};
