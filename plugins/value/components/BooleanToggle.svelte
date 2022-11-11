<svelte:options immutable={true} />

<script>import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons';
import { compileJSONPointer } from 'immutable-json-patch';
import Icon from 'svelte-awesome';
export let path;
export let value;
export let readOnly;
export let onPatch;
export let focus;
function toggleBooleanValue(event) {
    event.stopPropagation();
    if (readOnly) {
        return;
    }
    onPatch([
        {
            op: 'replace',
            path: compileJSONPointer(path),
            value: !value
        }
    ]);
    setTimeout(focus);
}
</script>

<div
  class="jse-boolean-toggle"
  class:jse-readonly={readOnly}
  on:mousedown={toggleBooleanValue}
  title={!readOnly ? 'Click to toggle this boolean value' : `Boolean value ${value}`}
>
  <Icon data={value === true ? faCheckSquare : faSquare} />
</div>

<style src="./BooleanToggle.scss">.jse-boolean-toggle {
  color: var(--jse-value-color-boolean);
  position: relative;
  padding-left: calc(0.5 * var(--jse-padding));
  padding-top: 1px;
  height: var(--jse-line-height);
}

.jse-boolean-toggle:not(.jse-readonly) {
  cursor: pointer;
}</style>
