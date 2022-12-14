<svelte:options immutable={true} />

<script>import { uniqueId } from '../../utils/uniqueId.js';
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { debounce, isEmpty, noop } from 'lodash-es';
import { getContext } from 'svelte';
import Icon from 'svelte-awesome';
import { DEBOUNCE_DELAY } from '../../constants.js';
import { compileJSONPointer, getIn } from 'immutable-json-patch';
import { stringifyJSONPath } from '../../utils/pathUtils.js';
import { transformModalState } from './transformModalState.js';
import TransformWizard from './TransformWizard.svelte';
import TransformModalHeader from './TransformModalHeader.svelte';
import AbsolutePopup from './popup/AbsolutePopup.svelte';
import { createDebug } from '../../utils/debug';
import TreeMode from '../modes/treemode/TreeMode.svelte';
import { stripRootObject } from '../../utils/pathUtils';
const debug = createDebug('jsoneditor:TransformModal');
export let id = 'transform-modal-' + uniqueId();
export let json;
export let selectedPath = [];
export let escapeControlCharacters;
export let escapeUnicodeCharacters;
export let parser;
export let queryLanguages;
export let queryLanguageId;
export let onChangeQueryLanguage;
export let onRenderValue;
export let onClassName;
export let onTransform;
$: selectedJson = getIn(json, selectedPath);
$: selectedContent = { json: selectedJson };
const { close } = getContext('simple-modal');
const stateId = `${id}:${compileJSONPointer(selectedPath)}`;
const state = transformModalState[stateId] || {};
// showWizard is not stored inside a stateId
let showWizard = transformModalState.showWizard !== false;
let showOriginal = transformModalState.showOriginal !== false;
let queryOptions = state.queryOptions || {};
let query = queryLanguageId === state.queryLanguageId && state.query
    ? state.query
    : getSelectedQueryLanguage(queryLanguageId).createQuery(json, state.queryOptions || {});
let isManual = state.isManual || false;
let previewError = undefined;
let previewContent = { text: '' };
function getSelectedQueryLanguage(queryLanguageId) {
    return queryLanguages.find((item) => item.id === queryLanguageId) || queryLanguages[0];
}
function updateQueryByWizard(newQueryOptions) {
    queryOptions = newQueryOptions;
    query = getSelectedQueryLanguage(queryLanguageId).createQuery(json, newQueryOptions);
    isManual = false;
    debug('updateQueryByWizard', { queryOptions, query, isManual });
}
function handleChangeQuery(event) {
    query = event.target.value;
    isManual = true;
    debug('handleChangeQuery', { query, isManual });
}
function previewTransform(json, query) {
    try {
        debug('previewTransform', {
            query
        });
        const jsonTransformed = getSelectedQueryLanguage(queryLanguageId).executeQuery(json, query);
        previewContent = { json: jsonTransformed };
        previewError = undefined;
    }
    catch (err) {
        previewContent = { text: '' };
        previewError = err;
    }
}
const previewTransformDebounced = debounce(previewTransform, DEBOUNCE_DELAY);
$: {
    previewTransformDebounced(selectedJson, query);
}
$: {
    // remember the selected values for the next time we open the SortModal
    // just in memory, not persisted
    transformModalState[stateId] = {
        queryOptions,
        query,
        queryLanguageId,
        isManual
    };
    debug('store state in memory', stateId, transformModalState[stateId]);
}
function handleTransform() {
    try {
        debug('handleTransform', { query });
        const jsonTransformed = getSelectedQueryLanguage(queryLanguageId).executeQuery(selectedJson, query);
        onTransform([
            {
                op: 'replace',
                path: compileJSONPointer(selectedPath),
                value: jsonTransformed
            }
        ]);
        close();
    }
    catch (err) {
        // this should never occur since we can only press the Transform
        // button when creating a preview was successful
        console.error(err);
        previewContent = { text: '' };
        previewError = err.toString();
    }
}
function toggleShowWizard() {
    showWizard = !showWizard;
    // not stored inside a stateId
    transformModalState.showWizard = showWizard;
}
function toggleShowOriginal() {
    showOriginal = !showOriginal;
    // not stored inside a stateId
    transformModalState.showOriginal = showOriginal;
}
function focus(element) {
    element.focus();
}
function handleChangeQueryLanguage(newQueryLanguageId) {
    debug('handleChangeQueryLanguage', newQueryLanguageId);
    queryLanguageId = newQueryLanguageId;
    onChangeQueryLanguage(newQueryLanguageId);
    const newSelectedQueryLanguage = getSelectedQueryLanguage(queryLanguageId);
    query = newSelectedQueryLanguage.createQuery(json, queryOptions);
    isManual = false;
}
</script>

<div class="jse-modal jse-transform">
  <AbsolutePopup>
    <TransformModalHeader
      {queryLanguages}
      {queryLanguageId}
      onChangeQueryLanguage={handleChangeQueryLanguage}
    />
    <div class="jse-contents">
      <div class="jse-main-contents">
        <div class="jse-query-contents">
          <div class="jse-label">
            <div class="jse-label-inner">Language</div>
          </div>
          <div class="jse-description">
            {@html getSelectedQueryLanguage(queryLanguageId).description}
          </div>

          <div class="jse-label">
            <div class="jse-label-inner">Path</div>
          </div>
          <input
            class="jse-path"
            type="text"
            readonly
            title="Selected path"
            value={!isEmpty(selectedPath)
              ? stripRootObject(stringifyJSONPath(selectedPath))
              : '(whole document)'}
          />

          <div class="jse-label">
            <div class="jse-label-inner">
              <button type="button" on:click={toggleShowWizard}>
                <Icon data={showWizard ? faCaretDown : faCaretRight} />
                Wizard
              </button>
            </div>
          </div>
          {#if showWizard}
            {#if Array.isArray(selectedJson)}
              <TransformWizard {queryOptions} json={selectedJson} onChange={updateQueryByWizard} />
            {:else}
              (Only available for arrays, not for objects)
            {/if}
          {/if}

          <div class="jse-label">
            <div class="jse-label-inner">Query</div>
          </div>
          <textarea
            class="jse-query"
            spellcheck="false"
            value={query}
            on:input={handleChangeQuery}
          />
        </div>
        <div class="jse-data-contents" class:jse-hide-original-data={!showOriginal}>
          <div class="jse-original-data" class:jse-hide={!showOriginal}>
            <div class="jse-label">
              <div class="jse-label-inner">
                <button type="button" on:click={toggleShowOriginal}>
                  <Icon data={showOriginal ? faCaretDown : faCaretRight} />
                  Original
                </button>
              </div>
            </div>
            {#if showOriginal}
              <TreeMode
                externalContent={selectedContent}
                readOnly={true}
                mainMenuBar={false}
                navigationBar={false}
                {escapeControlCharacters}
                {escapeUnicodeCharacters}
                {parser}
                {onRenderValue}
                onError={console.error}
                onChange={noop}
                onFocus={noop}
                onBlur={noop}
                onSortModal={noop}
                onTransformModal={noop}
                {onClassName}
              />
            {/if}
          </div>
          <div class="jse-preview-data">
            <div class="jse-label">
              <div class="jse-label-inner">Preview</div>
            </div>
            {#if !previewError}
              <TreeMode
                externalContent={previewContent}
                readOnly={true}
                mainMenuBar={false}
                navigationBar={false}
                {escapeControlCharacters}
                {escapeUnicodeCharacters}
                {parser}
                {onRenderValue}
                onError={console.error}
                onChange={noop}
                onFocus={noop}
                onBlur={noop}
                onSortModal={noop}
                onTransformModal={noop}
                {onClassName}
              />
            {:else}
              <div class="jse-preview jse-error">
                {previewError.toString()}
              </div>
            {/if}
          </div>
        </div>
      </div>

      <div class="jse-actions">
        <button
          type="button"
          class="jse-primary"
          on:click={handleTransform}
          use:focus
          disabled={!!previewError}
        >
          Transform
        </button>
      </div>
    </div>
  </AbsolutePopup>
</div>

<style src="./TransformModal.scss">.jse-modal {
  --height: 36px;
  --multiItemHeight: 28px;
  --multiItemMargin: 2px;
  --multiItemPadding: 2px 8px;
  --multiClearTop: 5px;
  --multiItemBorderRadius: 6px;
  --clearSelectTop: 2px;
  --clearSelectBottom: 2px;
  --indicatorTop: 8px;
  flex: 1;
  display: flex;
  flex-direction: column;
  font-family: var(--jse-font-family);
  font-size: var(--jse-font-size);
  line-height: normal;
  background: var(--jse-modal-background);
  color: var(--jse-text-color);
}
.jse-modal .jse-contents {
  padding: 20px;
  overflow: auto;
}
.jse-modal .jse-contents .jse-actions {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-top: var(--jse-padding);
}
.jse-modal .jse-contents .jse-actions button {
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font-family: var(--jse-font-family);
  font-size: var(--jse-font-size);
  padding: 5px;
  margin: 0;
  background: var(--jse-button-primary-background);
  color: var(--jse-button-primary-color);
  padding: var(--jse-padding) calc(2 * var(--jse-padding));
  border-radius: 3px;
}
.jse-modal .jse-contents .jse-actions button:hover {
  background: var(--jse-button-primary-background-highlight);
}
.jse-modal .jse-contents .jse-actions button:disabled {
  background: var(--jse-button-primary-background-disabled);
}

:global(.bg.jse-modal-bg) {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: var(--jse-modal-overlay-background);
}

:global(.bg.jse-modal-bg .jse-modal-window-wrap) {
  margin: 0;
}

:global(.bg.jse-modal-bg .jse-modal-window) {
  max-width: 90%;
  margin: 4rem auto 2rem auto;
  border-radius: 2px;
}

:global(.bg.jse-modal-bg .jse-modal-window.jse-modal-window-sort) {
  width: 400px;
}

:global(.bg.jse-modal-bg .jse-modal-window.jse-modal-window-transform) {
  width: 1200px;
  height: 1200px;
  max-height: 80%;
  display: flex;
}

:global(.bg.jse-modal-bg .jse-modal-content) {
  flex: 1;
  display: flex;
  max-height: calc(100vh - 6rem);
  padding: 0;
}

.jse-modal.jse-transform .jse-contents {
  flex: 1;
  display: flex;
  flex-direction: column;
  color: inherit;
  min-height: 0;
  padding: 0;
}
.jse-modal.jse-transform .jse-contents .jse-main-contents {
  flex: 1;
  display: flex;
  gap: calc(2 * var(--jse-padding));
  min-height: 0;
  box-sizing: border-box;
  padding: 0 calc(2 * var(--jse-padding)) var(--jse-padding);
}
.jse-modal.jse-transform .jse-contents .jse-main-contents .jse-query-contents {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.jse-modal.jse-transform .jse-contents .jse-main-contents .jse-query-contents .jse-description :global(p) {
  margin: var(--jse-padding) 0;
}
.jse-modal.jse-transform .jse-contents .jse-main-contents .jse-query-contents .jse-description :global(p):first-child {
  margin-top: 0;
}
.jse-modal.jse-transform .jse-contents .jse-main-contents .jse-query-contents .jse-description :global(p):last-child {
  margin-bottom: 0;
}
.jse-modal.jse-transform .jse-contents .jse-main-contents .jse-query-contents .jse-description :global(code) {
  background: var(--jse-modal-code-background);
  font-family: var(--jse-font-family-mono);
  font-size: var(--jse-font-size-mono);
}
.jse-modal.jse-transform .jse-contents .jse-main-contents .jse-query-contents textarea.jse-query {
  flex: 1;
  outline: none;
  resize: vertical;
}
.jse-modal.jse-transform .jse-contents .jse-main-contents .jse-data-contents {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: calc(2 * var(--jse-padding));
}
.jse-modal.jse-transform .jse-contents .jse-main-contents .jse-data-contents .jse-original-data {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  box-sizing: border-box;
}
.jse-modal.jse-transform .jse-contents .jse-main-contents .jse-data-contents .jse-original-data.jse-hide {
  flex: none;
}
.jse-modal.jse-transform .jse-contents .jse-main-contents .jse-data-contents .jse-preview-data {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  box-sizing: border-box;
}
.jse-modal.jse-transform .jse-contents .jse-main-contents .jse-data-contents.jse-hide-original-data {
  flex-direction: column;
  gap: 0;
  margin-bottom: 0;
}
.jse-modal.jse-transform .jse-contents .jse-actions {
  padding: var(--jse-padding) calc(2 * var(--jse-padding)) calc(2 * var(--jse-padding));
}
@media screen and (max-width: 1200px) {
  .jse-modal.jse-transform .jse-contents .jse-main-contents {
    flex-direction: column;
    overflow: auto;
  }
  .jse-modal.jse-transform .jse-contents .jse-main-contents .jse-query-contents textarea.jse-query {
    min-height: 150px;
    flex: none;
  }
  .jse-modal.jse-transform .jse-contents .jse-main-contents .jse-data-contents :global(.jse-tree-mode) {
    height: 300px;
    flex: none;
  }
}
.jse-modal.jse-transform .jse-label {
  font-weight: bold;
  display: block;
  box-sizing: border-box;
}
.jse-modal.jse-transform .jse-label .jse-label-inner {
  margin-top: calc(2 * var(--jse-padding));
  margin-bottom: calc(0.5 * var(--jse-padding));
  box-sizing: border-box;
}
.jse-modal.jse-transform .jse-label .jse-label-inner button {
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font-family: var(--jse-font-family);
  font-size: var(--jse-font-size);
  padding: 5px;
  margin: 0;
  font-weight: bold;
  padding: 0;
}
.jse-modal.jse-transform :global(.jse-tree-mode) {
  flex: 1;
  background: var(--jse-input-background-readonly);
  box-shadow: none;
  box-sizing: border-box;
  --jse-main-border: var(--jse-input-border);
}
.jse-modal.jse-transform input,
.jse-modal.jse-transform textarea {
  border: var(--jse-input-border);
  outline: none;
  box-sizing: border-box;
  padding: calc(0.5 * var(--jse-padding));
  font-family: var(--jse-font-family-mono);
  font-size: var(--jse-font-size-mono);
  color: inherit;
  background: var(--jse-input-background);
}
.jse-modal.jse-transform input:focus,
.jse-modal.jse-transform textarea:focus {
  border: var(--jse-input-border-focus);
}
.jse-modal.jse-transform input:read-only,
.jse-modal.jse-transform textarea:read-only {
  background: var(--jse-input-background-readonly);
}
.jse-modal.jse-transform .jse-preview.jse-error {
  flex: 1;
  background: var(--jse-input-background-readonly);
  border: var(--jse-input-border);
  color: var(--jse-error-color);
  padding: calc(0.5 * var(--jse-padding));
}
.jse-modal.jse-transform :global(a) {
  color: var(--jse-a-color);
}
.jse-modal.jse-transform :global(a:hover) {
  color: var(--jse-a-color-highlight);
}</style>
