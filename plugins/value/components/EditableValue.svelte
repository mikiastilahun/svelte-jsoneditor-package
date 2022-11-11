<svelte:options immutable={true} />

<script>import { compileJSONPointer } from 'immutable-json-patch';
import { isObjectOrArray, stringConvert } from '../../../utils/typeUtils';
import { createValueSelection, getSelectionNextInside } from '../../../logic/selection';
import { getValueClass } from './utils/getValueClass';
import EditableDiv from '../../../components/controls/EditableDiv.svelte';
import { UPDATE_SELECTION } from '../../../constants.js';
export let path;
export let value;
export let parser;
export let normalization;
export let enforceString;
export let onPatch;
export let onPasteJson;
export let onSelect;
export let onFind;
export let focus;
function convert(value) {
    return enforceString ? value : stringConvert(value, parser);
}
function handleChangeValue(newValue, updateSelection) {
    onPatch([
        {
            op: 'replace',
            path: compileJSONPointer(path),
            value: convert(normalization.unescapeValue(newValue))
        }
    ], (patchedJson, patchedState) => {
        const selection = updateSelection === UPDATE_SELECTION.NEXT_INSIDE
            ? getSelectionNextInside(patchedJson, patchedState, path) || patchedState.selection
            : createValueSelection(path, false);
        return {
            state: {
                ...patchedState,
                selection
            }
        };
    });
    if (updateSelection !== UPDATE_SELECTION.SELF) {
        focus();
    }
}
function handleCancelChange() {
    onSelect(createValueSelection(path, false));
    focus();
}
function handlePaste(pastedText) {
    try {
        const pastedJson = parser.parse(pastedText);
        if (isObjectOrArray(pastedJson)) {
            onPasteJson({
                path,
                contents: pastedJson
            });
        }
    }
    catch (err) {
        // silently ignore: thee pasted text is no valid JSON object or array,
        // no need to do anything
    }
}
function handleOnValueClass(value) {
    return getValueClass(convert(normalization.unescapeValue(value)), parser);
}
</script>

<EditableDiv
  value={normalization.escapeValue(value)}
  onChange={handleChangeValue}
  onCancel={handleCancelChange}
  onPaste={handlePaste}
  {onFind}
  onValueClass={handleOnValueClass}
/>
