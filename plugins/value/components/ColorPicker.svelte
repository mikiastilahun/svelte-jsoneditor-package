<svelte:options immutable={true} />

<script>import { getColorCSS } from '../../../utils/typeUtils';
import { getWindow } from '../../../utils/domUtils';
import { compileJSONPointer } from 'immutable-json-patch';
import { getContext } from 'svelte';
import ColorPickerPopup from '../../../components/controls/ColorPickerPopup.svelte';
const { openAbsolutePopup } = getContext('absolute-popup');
export let path;
export let value;
export let readOnly;
export let onPatch;
export let focus;
$: color = getColorCSS(value);
function onChange(color) {
    onPatch([
        {
            op: 'replace',
            path: compileJSONPointer(path),
            value: color
        }
    ]);
    onClose();
}
function onClose() {
    focus();
}
function openColorPicker(event) {
    if (readOnly) {
        return;
    }
    // estimate of the color picker height
    // we'll render the color picker on top
    // when there is not enough space below, and there is enough space above
    const height = 300;
    const top = event.target.getBoundingClientRect().top;
    const windowHeight = getWindow(event.target).innerHeight;
    const showOnTop = windowHeight - top < height && top > height;
    const props = {
        color: value,
        onChange,
        showOnTop
    };
    openAbsolutePopup(ColorPickerPopup, props, {
        anchor: event.target,
        closeOnOuterClick: true,
        onClose,
        offsetTop: 18,
        offsetLeft: -8,
        height
    });
}
</script>

<button
  type="button"
  class="jse-color-picker-button"
  class:jse-readonly={readOnly}
  style="background: {color}"
  title={!readOnly ? 'Click to open a color picker' : `Color ${value}`}
  on:click={openColorPicker}
/>

<style src="./ColorPicker.scss">.jse-color-picker-button {
  font-size: var(--jse-font-size-mono);
  width: var(--jse-color-picker-button-size);
  height: var(--jse-color-picker-button-size);
  box-sizing: border-box;
  padding: 0;
  margin: 2px;
  border: 1px solid var(--jse-text-color);
  border-radius: 2px;
  background: inherit;
  outline: none;
}

.jse-color-picker-button:not(.jse-readonly) {
  cursor: pointer;
}</style>
