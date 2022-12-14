<svelte:options immutable={true} />

<script>import { debounce, noop } from 'lodash-es';
import Icon from 'svelte-awesome';
import { faCaretDown, faCaretRight, faChevronDown, faChevronUp, faCircleNotch, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { DEBOUNCE_DELAY, MAX_SEARCH_RESULTS } from '../../../../constants';
import { keyComboFromEvent } from '../../../../utils/keyBindings';
export let show = false;
export let searching;
export let resultCount = 0;
export let activeIndex = 0;
export let showReplace = false;
export let readOnly = false;
export let onChange = noop;
export let onPrevious = noop;
export let onNext = noop;
export let onReplace = noop;
export let onReplaceAll = noop;
export let onClose = noop;
let text = '';
let previousText = '';
let replaceText = '';
$: formattedResultCount =
    resultCount >= MAX_SEARCH_RESULTS ? `${MAX_SEARCH_RESULTS - 1}+` : String(resultCount);
$: onChangeDebounced = debounce(onChange, DEBOUNCE_DELAY);
$: onChangeDebounced(text);
$: if (show) {
    initShow();
}
function initShow() {
    if (text !== '') {
        onChange(text);
    }
}
function toggleShowReplace() {
    showReplace = !showReplace && !readOnly;
}
function handleSubmit(event) {
    event.preventDefault();
    const pendingChanges = text !== previousText;
    if (pendingChanges) {
        previousText = text;
        onChangeDebounced.cancel();
        onChange(text);
    }
    else {
        onNext();
    }
}
function handleKeyDown(event) {
    // key events must not be handled by the generic keydown handler of the
    // whole JSONEditor.
    event.stopPropagation();
    const combo = keyComboFromEvent(event);
    if (combo === 'Enter') {
        event.preventDefault();
        onNext();
    }
    if (combo === 'Shift+Enter') {
        event.preventDefault();
        onPrevious();
    }
    if (combo === 'Ctrl+Enter' || combo === 'Command+Enter') {
        event.preventDefault();
        if (showReplace) {
            handleReplace();
        }
        else {
            onNext();
            // TODO: move focus to the active element
        }
    }
    if (combo === 'Ctrl+H') {
        event.preventDefault();
        toggleShowReplace();
    }
    if (combo === 'Escape') {
        event.preventDefault();
        onClose();
    }
}
function handleReplace() {
    if (readOnly) {
        return;
    }
    onReplace(text, replaceText);
}
function handleReplaceAll() {
    if (readOnly) {
        return;
    }
    onReplaceAll(text, replaceText);
}
function initSearchInput(element) {
    element.select();
}
</script>

{#if show}
  <div class="jse-search-box">
    <form class="jse-search-form" on:submit={handleSubmit} on:keydown={handleKeyDown}>
      {#if !readOnly}
        <button
          type="button"
          class="jse-replace-toggle"
          title="Toggle visibility of replace options (Ctrl+H)"
          on:click={toggleShowReplace}
        >
          <Icon data={showReplace ? faCaretDown : faCaretRight} />
        </button>
      {/if}
      <div class="jse-search-contents">
        <div class="jse-search-section">
          <div class="jse-search-icon">
            {#if searching}
              <Icon data={faCircleNotch} spin />
            {:else}
              <Icon data={faSearch} />
            {/if}
          </div>
          <label class="jse-search-input-label" about="jse-search input">
            <input
              class="jse-search-input"
              title="Enter text to search"
              type="text"
              placeholder="Find"
              bind:value={text}
              use:initSearchInput
            />
          </label>
          <div class="jse-search-count" class:jse-visible={text !== ''}>
            {activeIndex !== -1 ? `${activeIndex + 1}/` : ''}{formattedResultCount}
          </div>
          <button
            type="button"
            class="jse-search-next"
            title="Go to next search result (Enter)"
            on:click={() => onNext()}
          >
            <Icon data={faChevronDown} />
          </button>
          <button
            type="button"
            class="jse-search-previous"
            title="Go to previous search result (Shift+Enter)"
            on:click={() => onPrevious()}
          >
            <Icon data={faChevronUp} />
          </button>
          <button
            type="button"
            class="jse-search-clear"
            title="Close search box (Esc)"
            on:click={() => onClose()}
          >
            <Icon data={faTimes} />
          </button>
        </div>
        {#if showReplace && !readOnly}
          <div class="jse-replace-section">
            <input
              class="jse-replace-input"
              title="Enter replacement text"
              type="text"
              placeholder="Replace"
              bind:value={replaceText}
            />
            <button
              type="button"
              title="Replace current occurrence (Ctrl+Enter)"
              on:click={handleReplace}>Replace</button
            >
            <button type="button" title="Replace all occurrences" on:click={handleReplaceAll}
              >All</button
            >
          </div>
        {/if}
      </div>
    </form>
  </div>
{/if}

<style src="./SearchBox.scss">.jse-search-box {
  border: var(--jse-panel-border);
  border-radius: 3px;
  font-family: var(--jse-font-family);
  font-size: var(--jse-font-size);
  background: var(--jse-panel-background);
  color: var(--jse-panel-color-readonly);
  box-shadow: var(--jse-controls-box-shadow);
  display: inline-block;
  width: 400px;
  max-width: 100%;
  overflow: auto;
}
.jse-search-box .jse-search-form {
  display: flex;
  align-items: stretch;
}
.jse-search-box .jse-search-form button,
.jse-search-box .jse-search-form input {
  font-family: inherit;
  font-size: inherit;
}
.jse-search-box .jse-search-form button {
  display: block;
  text-align: center;
  border: none;
  padding: 0 5px;
  margin: 0;
  cursor: pointer;
  color: var(--jse-panel-button-color);
  background: var(--jse-panel-button-background);
}
.jse-search-box .jse-search-form button:hover {
  color: var(--jse-panel-button-color-highlight);
  background: var(--jse-panel-button-background-highlight);
}
.jse-search-box .jse-search-form input {
  color: var(--jse-panel-color);
  border: var(--jse-input-border);
  border-radius: 3px;
  background: var(--jse-input-background);
  height: 28px;
  padding: 0 5px;
  margin: 0;
  flex: 1;
  outline: none;
}
.jse-search-box .jse-search-form .jse-replace-toggle {
  padding: var(--jse-padding) calc(0.5 * var(--jse-padding));
  min-width: 20px;
  background: var(--jse-panel-button-background-highlight);
}
.jse-search-box .jse-search-form .jse-search-contents {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: calc(0.5 * var(--jse-padding));
  gap: calc(0.5 * var(--jse-padding));
}
.jse-search-box .jse-search-form .jse-search-contents .jse-search-section {
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 32px;
}
.jse-search-box .jse-search-form .jse-search-contents .jse-search-section .jse-search-icon {
  color: inherit;
  cursor: inherit;
  background: inherit;
  position: absolute;
  top: calc(0.5 * var(--jse-padding));
  left: calc(0.5 * var(--jse-padding));
}
.jse-search-box .jse-search-form .jse-search-contents .jse-search-section label.jse-search-input-label {
  flex: 1;
  display: flex;
}
.jse-search-box .jse-search-form .jse-search-contents .jse-search-section .jse-search-count {
  color: inherit;
  font-size: 80%;
  visibility: hidden;
  padding: 0 5px;
  min-width: 36px;
  text-align: center;
}
.jse-search-box .jse-search-form .jse-search-contents .jse-search-section .jse-search-count.jse-visible {
  visibility: visible;
}
.jse-search-box .jse-search-form .jse-search-contents .jse-replace-section {
  padding-left: 32px;
  flex: 1;
  display: flex;
}
.jse-search-box .jse-search-form .jse-search-contents .jse-replace-section button {
  width: auto;
}</style>
