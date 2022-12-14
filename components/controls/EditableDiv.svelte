<svelte:options immutable={true} />

<script>import { onDestroy, onMount } from 'svelte';
import { addNewLineSuffix, removeNewLineSuffix, setCursorToEnd } from '../../utils/domUtils';
import { keyComboFromEvent } from '../../utils/keyBindings';
import { createDebug } from '../../utils/debug';
import classnames from 'classnames';
import { noop } from 'lodash-es';
import { UPDATE_SELECTION } from '../../constants.js';
const debug = createDebug('jsoneditor:EditableDiv');
export let value;
export let shortText = false;
export let onChange;
export let onCancel;
export let onFind;
export let onPaste = noop;
export let onValueClass = () => '';
let domValue;
let valueClass = onValueClass(value);
let closed = false;
onMount(() => {
    debug('onMount', { value });
    setDomValue(value);
    // focus
    setTimeout(() => setCursorToEnd(domValue));
});
onDestroy(() => {
    const newValue = getDomValue();
    debug('onDestroy', { closed, value, newValue });
    if (!closed && newValue !== value) {
        onChange(newValue, UPDATE_SELECTION.NO);
    }
});
function getDomValue() {
    return removeNewLineSuffix(domValue.innerText);
}
function setDomValue(updatedValue) {
    domValue.innerText = addNewLineSuffix(updatedValue);
}
function handleValueInput() {
    const newValue = getDomValue();
    if (newValue === '') {
        // immediately update to clean up any left over <br/>
        setDomValue('');
    }
    // update class
    valueClass = onValueClass(newValue);
}
function handleValueKeyDown(event) {
    event.stopPropagation();
    const combo = keyComboFromEvent(event).replace(/^Command\+/, 'Ctrl+');
    if (combo === 'Escape') {
        // cancel changes (needed to prevent triggering a change onDestroy)
        closed = true;
        onCancel();
    }
    if (combo === 'Enter' || combo === 'Tab') {
        // apply changes
        closed = true;
        const newValue = getDomValue();
        onChange(newValue, UPDATE_SELECTION.NEXT_INSIDE);
    }
    if (combo === 'Ctrl+F') {
        event.preventDefault();
        onFind(false);
    }
    if (combo === 'Ctrl+H') {
        event.preventDefault();
        onFind(true);
    }
}
function handleValuePaste(event) {
    if (!onPaste) {
        return;
    }
    const clipboardText = event.clipboardData.getData('text/plain');
    onPaste(clipboardText);
}
function handleBlur() {
    const hasFocus = document.hasFocus();
    const newValue = getDomValue();
    debug('handleBlur', { hasFocus, closed, value, newValue });
    // we only want to close the editable div when the focus did go to another
    // element on the same page, but not when the user switches to another
    // application or browser tab to copy/paste something whilst still editing
    // the value, hence the check for document.hasFocus()
    if (document.hasFocus() && !closed) {
        closed = true;
        if (newValue !== value) {
            onChange(newValue, UPDATE_SELECTION.SELF);
        }
        else {
            onCancel();
        }
    }
}
</script>

<div
  class={classnames('jse-editable-div', valueClass, { 'jse-short-text': shortText })}
  contenteditable="true"
  spellcheck="false"
  on:input={handleValueInput}
  on:keydown={handleValueKeyDown}
  on:paste={handleValuePaste}
  on:blur={handleBlur}
  bind:this={domValue}
/>

<style src="./EditableDiv.scss">.jse-value.jse-string {
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

div.jse-editable-div {
  min-width: 2em;
  padding: 0 5px;
  box-sizing: border-box;
  outline: none;
  border-radius: 1px;
  vertical-align: top;
  word-break: normal;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
div.jse-editable-div.jse-short-text {
  overflow-wrap: normal;
}
div.jse-editable-div[contenteditable=true] {
  outline: var(--jse-edit-outline);
  background: inherit !important;
  position: relative;
  border-radius: 0;
  z-index: 3;
}
div.jse-editable-div.jse-empty:not(:focus) {
  outline: 1px dotted var(--jse-tag-background);
  -moz-outline-radius: 2px;
}
div.jse-editable-div.jse-empty::after {
  pointer-events: none;
  color: var(--jse-tag-background);
}</style>
