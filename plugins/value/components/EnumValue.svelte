<svelte:options immutable={true} />

<script>import { compileJSONPointer } from 'immutable-json-patch';
import { getValueClass } from './utils/getValueClass';
export let path;
export let value;
export let parser;
export let readOnly;
export let isSelected;
export let onPatch;
export let options;
let refSelect;
let bindValue = value;
$: bindValue = value;
function applyFocus(isSelected) {
    if (isSelected) {
        if (refSelect) {
            refSelect.focus();
        }
    }
}
$: applyFocus(isSelected);
function handleSelect(event) {
    event.stopPropagation();
    if (readOnly) {
        return;
    }
    onPatch([
        {
            op: 'replace',
            path: compileJSONPointer(path),
            value: bindValue
        }
    ]);
}
function handleMouseDown(event) {
    // stop propagation to prevent selecting the whole line
    event.stopPropagation();
}
</script>

<select
  class={`jse-enum-value ${getValueClass(bindValue, parser)}`}
  class:jse-selected={isSelected}
  bind:value={bindValue}
  bind:this={refSelect}
  on:change={handleSelect}
  on:mousedown={handleMouseDown}
>
  {#each options as option}
    <option value={option.value}>{option.text}</option>
  {/each}
</select>

<style src="./EnumValue.scss">.jse-value.jse-string {
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

.jse-enum-value {
  background: var(--jse-hover-background-color);
  border: none;
  padding: 0;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  outline: none;
}
.jse-enum-value.jse-selected {
  background: var(--jse-selection-background-color);
  color: inherit;
}
.jse-enum-value.jse-value:focus {
  color: var(--jse-text-color);
}

:global(.jse-json-node.jse-selected) .jse-enum-value {
  background: transparent;
}</style>
