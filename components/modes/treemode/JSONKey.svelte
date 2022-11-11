<svelte:options immutable={true} />

<script>import classnames from 'classnames';
import { initial } from 'lodash-es';
import { createKeySelection, createValueSelection, isEditingSelection } from '../../../logic/selection';
import SearchResultHighlighter from './highlight/SearchResultHighlighter.svelte';
import EditableDiv from '../../controls/EditableDiv.svelte';
import { addNewLineSuffix } from '../../../utils/domUtils';
import { UPDATE_SELECTION } from '../../../constants';
import {} from '../../../types';
import { isKeySelection } from '../../../logic/selection.js';
import ContextMenuButton from './contextmenu/ContextMenuButton.svelte';
export let path;
export let pointer;
export let key;
export let selection;
export let searchResultItems;
export let onUpdateKey;
export let context;
$: isSelected = selection
    ? selection.pointersMap[pointer] === true && isKeySelection(selection)
    : undefined;
$: isEditingKey = isSelected && isEditingSelection(selection);
function handleKeyDoubleClick(event) {
    if (!isEditingKey && !context.readOnly) {
        event.preventDefault();
        context.onSelect(createKeySelection(path, true));
    }
}
function getKeyClass(key) {
    return classnames('jse-key', {
        'jse-empty': key === ''
    });
}
function handleChangeValue(newKey, updateSelection) {
    const updatedKey = onUpdateKey(key, context.normalization.unescapeValue(newKey));
    const updatedPath = initial(path).concat(updatedKey);
    context.onSelect(updateSelection === UPDATE_SELECTION.NEXT_INSIDE
        ? createValueSelection(updatedPath, false)
        : createKeySelection(updatedPath, false));
    if (updateSelection !== UPDATE_SELECTION.SELF) {
        context.focus();
    }
}
function handleCancelChange() {
    context.onSelect(createKeySelection(path, false));
    context.focus();
}
</script>

{#if isEditingKey}
  <EditableDiv
    value={context.normalization.escapeValue(key)}
    shortText
    onChange={handleChangeValue}
    onCancel={handleCancelChange}
    onFind={context.onFind}
  />
{:else}
  <div data-type="selectable-key" class={getKeyClass(key)} on:dblclick={handleKeyDoubleClick}>
    {#if searchResultItems}
      <SearchResultHighlighter text={context.normalization.escapeValue(key)} {searchResultItems} />
    {:else}
      {addNewLineSuffix(context.normalization.escapeValue(key))}
    {/if}
  </div>
{/if}
{#if !context.readOnly && isSelected && !isEditingKey}
  <ContextMenuButton selected={true} onContextMenu={context.onContextMenu} />
{/if}

<style src="./JSONKey.scss">.jse-key {
  display: inline-block;
  min-width: 2em;
  padding: 0 5px;
  box-sizing: border-box;
  outline: none;
  border-radius: 1px;
  vertical-align: top;
  color: var(--jse-key-color);
  word-break: normal;
  overflow-wrap: normal;
  white-space: pre-wrap;
}
.jse-key:hover {
  background: var(--jse-hover-background-color);
}
.jse-key:hover {
  background: var(--jse-hover-background-color);
}
.jse-key.jse-empty {
  min-width: 3em;
  outline: 1px dotted var(--jse-tag-background);
  -moz-outline-radius: 2px;
}
.jse-key.jse-empty::after {
  pointer-events: none;
  color: var(--jse-tag-background);
  content: "key";
}</style>
