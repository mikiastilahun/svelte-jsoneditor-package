<svelte:options immutable={true} />

<script>import { isUrl } from '../../../utils/typeUtils';
import { createValueSelection } from '../../../logic/selection';
import SearchResultHighlighter from '../../../components/modes/treemode/highlight/SearchResultHighlighter.svelte';
import { getValueClass } from './utils/getValueClass';
import { addNewLineSuffix } from '../../../utils/domUtils';
export let path;
export let value;
export let readOnly;
export let normalization;
export let parser;
export let onSelect;
export let searchResultItems;
$: valueIsUrl = isUrl(value);
function handleValueClick(event) {
    if (typeof value === 'string' && valueIsUrl && event.ctrlKey) {
        event.preventDefault();
        event.stopPropagation();
        window.open(value, '_blank');
    }
}
function handleValueDoubleClick(event) {
    if (!readOnly) {
        event.preventDefault();
        onSelect(createValueSelection(path, true));
    }
}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  data-type="selectable-value"
  class={getValueClass(value, parser)}
  on:click={handleValueClick}
  on:dblclick={handleValueDoubleClick}
  title={valueIsUrl ? 'Ctrl+Click or Ctrl+Enter to open url in new window' : null}
>
  {#if searchResultItems}
    <SearchResultHighlighter text={normalization.escapeValue(value)} {searchResultItems} />
  {:else}
    {addNewLineSuffix(normalization.escapeValue(value))}
  {/if}
</div>

<style src="./ReadonlyValue.scss">.jse-value.jse-string {
  color: var(--jse-value-color-string);
}
.jse-value.jse-object, .jse-value.jse-array {
  min-width: 16px;
  color: var(--jse-delimiter-color);
}
.jse-value.jse-number {
  color: var(--jse-value-color-number);
}
.jse-value.jse-boolean {
  color: var(--jse-value-color-boolean);
}
.jse-value.jse-null {
  color: var(--jse-value-color-null);
}
.jse-value.jse-invalid {
  color: var(--jse-text-color);
}
.jse-value.jse-url {
  color: var(--jse-value-color-url);
  text-decoration: underline;
}

.jse-value {
  min-width: 2em;
  padding: 0 5px;
  box-sizing: border-box;
  outline: none;
  border-radius: 1px;
  vertical-align: top;
  word-break: normal;
  overflow-wrap: anywhere;
  white-space: pre-wrap;
}
.jse-value:hover {
  background: var(--jse-hover-background-color);
}
.jse-value.jse-empty {
  min-width: 4em;
  outline: 1px dotted var(--jse-tag-background);
  -moz-outline-radius: 2px;
}
.jse-value.jse-empty::after {
  pointer-events: none;
  color: var(--jse-tag-background);
  content: "value";
}</style>
