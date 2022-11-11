<script>import { getContext, onDestroy, onMount } from 'svelte';
import copyToClipBoard from '../../../utils/copyToClipboard';
import { faCopy, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import Icon from 'svelte-awesome';
import { keyComboFromEvent } from '../../../utils/keyBindings';
import { tooltip } from '../../controls/tooltip/tooltip';
const absolutePopupContext = getContext('absolute-popup');
export let path;
export let pathParser;
export let onChange;
export let onClose;
export let onError;
export let pathExists;
let inputRef;
let inputPath;
let validationActive = false;
$: inputPath = pathParser.stringify(path);
$: inputValidationError = validationActive ? parseAndValidate(inputPath).error : undefined;
let copiedTimer = undefined;
let copied = false;
const copiedDelay = 1000; // ms
onMount(() => {
    focus();
});
onDestroy(() => {
    clearTimeout(copiedTimer);
});
function focus() {
    inputRef.focus();
}
function parseAndValidate(pathStr) {
    try {
        const path = pathParser.parse(pathStr);
        validatePathExists(path);
        return {
            path,
            error: undefined
        };
    }
    catch (error) {
        return {
            path: undefined,
            error
        };
    }
}
function validatePathExists(path) {
    if (!pathExists(path)) {
        throw new Error('Path does not exist in current document');
    }
}
function handleInput(event) {
    inputPath = event.currentTarget.value;
}
function handleKeyDown(event) {
    const combo = keyComboFromEvent(event);
    if (combo === 'Escape') {
        onClose();
    }
    if (combo === 'Enter') {
        validationActive = true;
        const result = parseAndValidate(inputPath);
        if (result.path !== undefined) {
            onChange(result.path);
        }
        else {
            onError(result.error);
        }
    }
}
function handleCopy() {
    copyToClipBoard(inputPath);
    copied = true;
    copiedTimer = setTimeout(() => (copied = false), copiedDelay);
    focus();
}
</script>

<div class="jse-navigation-bar-path-editor" class:error={inputValidationError}>
  <input
    type="text"
    class="jse-navigation-bar-text"
    value={inputPath}
    bind:this={inputRef}
    on:keydown|stopPropagation={handleKeyDown}
    on:input={handleInput}
  />
  {#if inputValidationError}
    <button
      type="button"
      class="jse-navigation-bar-validation-error"
      use:tooltip={{
        text: inputValidationError,
        ...absolutePopupContext
      }}
    >
      <Icon data={faExclamationTriangle} />
    </button>
  {/if}
  {#if copied}
    <div class="jse-copied-text">Copied!</div>
  {/if}
  <button
    type="button"
    class="jse-navigation-bar-copy"
    class:copied
    title="Copy selected path to the clipboard"
    on:click={handleCopy}
  >
    <Icon data={faCopy} />
  </button>
</div>

<style src="./NavigationBarPathEditor.scss">.jse-navigation-bar-path-editor {
  flex: 1;
  display: flex;
  border: var(--jse-edit-outline);
  background: var(--jse-background-color);
}
.jse-navigation-bar-path-editor input.jse-navigation-bar-text {
  flex: 1;
  font-family: inherit;
  font-size: inherit;
  padding: 0 5px 1px;
  background: var(--jse-background-color);
  color: var(--jse-text-color);
  border: none;
  outline: none;
}
.jse-navigation-bar-path-editor button {
  border: none;
  background: var(--jse-background-color);
  cursor: pointer;
  font-family: inherit;
  font-size: 80%;
  color: inherit;
}
.jse-navigation-bar-path-editor button.jse-navigation-bar-copy.copied {
  color: var(--jse-message-success-background);
}
.jse-navigation-bar-path-editor button.jse-navigation-bar-validation-error {
  color: var(--jse-error-color);
}
.jse-navigation-bar-path-editor.error {
  border-color: var(--jse-error-color);
}
.jse-navigation-bar-path-editor.error input.jse-navigation-bar-text {
  color: var(--jse-error-color);
}
.jse-navigation-bar-path-editor .jse-copied-text {
  background: var(--jse-message-success-background);
  color: var(--jse-message-success-color);
  position: relative;
  margin: 2px;
  padding: 0 5px;
  border-radius: 3px;
}</style>
