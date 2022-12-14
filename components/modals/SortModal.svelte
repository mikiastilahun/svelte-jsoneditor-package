<svelte:options immutable={true} />

<script>import { isEmpty } from 'lodash-es';
import { getContext } from 'svelte';
import Select from 'svelte-select';
import Header from './Header.svelte';
import { getNestedPaths } from '../../utils/arrayUtils.js';
import { isObject } from '../../utils/typeUtils.js';
import { pathToOption, stringifyJSONPath } from '../../utils/pathUtils.js';
import { sortArray, sortObjectKeys } from '../../logic/sort.js';
import { sortModalState } from './sortModalState.js';
import { compileJSONPointer, getIn } from 'immutable-json-patch';
import { createDebug } from '../../utils/debug';
import { stripRootObject } from '../../utils/pathUtils.js';
const debug = createDebug('jsoneditor:SortModal');
export let id;
export let json; // the whole document
export let selectedPath;
export let onSort;
const { close } = getContext('simple-modal');
const stateId = `${id}:${compileJSONPointer(selectedPath)}`;
const selectedJson = getIn(json, selectedPath);
$: jsonIsArray = Array.isArray(selectedJson);
$: paths = jsonIsArray ? getNestedPaths(selectedJson) : undefined;
$: properties = paths ? paths.map(pathToOption) : undefined;
const asc = {
    value: 1,
    label: 'ascending'
};
const desc = {
    value: -1,
    label: 'descending'
};
const directions = [asc, desc];
let selectedProperty = (sortModalState[stateId] && sortModalState[stateId].selectedProperty) || undefined;
let selectedDirection = (sortModalState[stateId] && sortModalState[stateId].selectedDirection) || asc;
let sortError = undefined;
$: {
    // if there is only one option, select it and do not render the select box
    if (selectedProperty === undefined && properties && properties.length === 1) {
        selectedProperty = properties[0];
    }
}
$: {
    // remember the selected values for the next time we open the SortModal
    // just in memory, not persisted
    sortModalState[stateId] = {
        selectedProperty,
        selectedDirection
    };
    debug('store state in memory', stateId, sortModalState[stateId]);
}
function handleSort() {
    try {
        sortError = undefined;
        if (jsonIsArray) {
            if (!selectedProperty) {
                return;
            }
            const property = selectedProperty.value;
            const direction = selectedDirection.value;
            const operations = sortArray(json, selectedPath, property, direction);
            onSort(operations);
        }
        else if (isObject(selectedJson)) {
            const direction = selectedDirection.value;
            const operations = sortObjectKeys(json, selectedPath, direction);
            onSort(operations);
        }
        else {
            console.error('Cannot sort: no array or object');
        }
        close();
    }
    catch (err) {
        sortError = err.toString();
    }
}
function focus(element) {
    element.focus();
}
</script>

<div class="jse-modal jse-sort">
  <Header title={jsonIsArray ? 'Sort array items' : 'Sort object keys'} />

  <div class="jse-contents">
    <table>
      <colgroup>
        <col width="25%" />
        <col width="75%" />
      </colgroup>
      <tbody>
        <tr>
          <th>Path</th>
          <td>
            <input
              class="jse-path"
              type="text"
              readonly
              title="Selected path"
              value={!isEmpty(selectedPath)
                ? stripRootObject(stringifyJSONPath(selectedPath))
                : '(whole document)'}
            />
          </td>
        </tr>
        {#if jsonIsArray && (properties.length > 1 || selectedProperty === undefined)}
          <tr>
            <th>Property</th>
            <td>
              <Select showIndicator items={properties} bind:value={selectedProperty} />
            </td>
          </tr>
        {/if}
        <tr>
          <th>Direction</th>
          <td>
            <Select
              showIndicator
              items={directions}
              bind:value={selectedDirection}
              isClearable={false}
            />
          </td>
        </tr>
      </tbody>
    </table>

    <div class="jse-space">
      {#if sortError}
        <div class="jse-error">
          {sortError}
        </div>
      {/if}
    </div>

    <div class="jse-actions">
      <button
        type="button"
        class="jse-primary"
        on:click={handleSort}
        use:focus
        disabled={jsonIsArray ? !selectedProperty : false}
      >
        Sort
      </button>
    </div>
  </div>
</div>

<style src="./SortModal.scss">.jse-modal {
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

.jse-modal.jse-sort table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}
.jse-modal.jse-sort table th,
.jse-modal.jse-sort table td {
  text-align: left;
  vertical-align: middle;
  font-weight: normal;
  padding-bottom: var(--jse-padding);
}
.jse-modal.jse-sort table th input.jse-path,
.jse-modal.jse-sort table td input.jse-path {
  width: 100%;
  box-sizing: border-box;
  padding: 6px 16px;
  border: var(--jse-input-border);
  border-radius: var(--jse-input-radius);
  font-family: inherit;
  font-size: inherit;
  background: inherit;
  color: inherit;
  outline: none;
}
.jse-modal.jse-sort table th input.jse-path:read-only,
.jse-modal.jse-sort table td input.jse-path:read-only {
  background: var(--jse-input-background-readonly);
}
.jse-modal.jse-sort table th :global(.selectContainer input),
.jse-modal.jse-sort table td :global(.selectContainer input) {
  box-sizing: border-box;
}
.jse-modal.jse-sort .jse-space {
  height: 200px;
}
.jse-modal.jse-sort .jse-space .jse-error {
  color: var(--jse-error-color);
}</style>
