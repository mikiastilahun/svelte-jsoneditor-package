<svelte:options immutable={true} />

<script>import { faAngleDown, faAngleRight, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { isEmpty } from 'lodash-es';
import Icon from 'svelte-awesome';
import { stringifyJSONPath } from '../../utils/pathUtils.js';
import { stripRootObject } from '../../utils/pathUtils.js';
export let validationErrors;
export let selectError;
let expanded = true;
function collapse() {
    expanded = false;
}
function expand() {
    expanded = true;
}
</script>

{#if !isEmpty(validationErrors)}
  <div class="jse-validation-errors-overview">
    {#if expanded || validationErrors.length === 1}
      <table>
        <tbody>
          {#each validationErrors as validationError, index}
            <tr
              class="jse-validation-error"
              on:click={() => {
                // trigger on the next tick to prevent the editor not getting focus
                setTimeout(() => selectError(validationError))
              }}
            >
              <td class="jse-validation-error-icon">
                <Icon data={faExclamationTriangle} />
              </td>
              <td>
                {stripRootObject(stringifyJSONPath(validationError.path))}
              </td>
              <td>
                {validationError.message}
              </td>
              <td class="jse-validation-error-action">
                {#if index === 0 && validationErrors.length > 1}
                  <button
                    type="button"
                    class="jse-validation-errors-collapse"
                    on:click|stopPropagation={collapse}
                    title="Collapse validation errors"
                  >
                    <Icon data={faAngleDown} />
                  </button>
                {/if}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    {:else}
      <table>
        <tbody>
          <tr class="jse-validation-error" on:click={expand}>
            <td class="jse-validation-error-icon">
              <Icon data={faExclamationTriangle} />
            </td>
            <td>
              {validationErrors.length} validation errors
              <div class="jse-validation-errors-expand">
                <Icon data={faAngleRight} />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    {/if}
  </div>
{/if}

<style src="./ValidationErrorsOverview.scss">.jse-validation-errors-overview {
  font-family: var(--jse-font-family-mono);
  font-size: var(--jse-font-size-mono);
  background: var(--jse-message-warning-background);
  color: var(--jse-message-warning-color);
  overflow: auto;
  max-height: 25%;
}
.jse-validation-errors-overview table {
  border-collapse: collapse;
  width: 100%;
}
.jse-validation-errors-overview table tr {
  cursor: pointer;
}
.jse-validation-errors-overview table tr:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.jse-validation-errors-overview table tr td {
  padding: 4px var(--jse-padding);
  vertical-align: middle;
}
.jse-validation-errors-overview table tr td.jse-validation-error-icon {
  width: 36px;
  box-sizing: border-box;
}
.jse-validation-errors-overview table tr td.jse-validation-error-action {
  width: 36px;
  box-sizing: border-box;
  padding: 0;
}
.jse-validation-errors-overview table tr td.jse-validation-error-action button.jse-validation-errors-collapse {
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font-family: var(--jse-font-family);
  font-size: var(--jse-font-size);
  padding: 5px;
  margin: 0;
  width: 36px;
  height: 26px;
  cursor: pointer;
}
.jse-validation-errors-overview table tr td.jse-validation-error-action button.jse-validation-errors-collapse:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
.jse-validation-errors-overview table tr td div.jse-validation-errors-expand {
  display: inline-block;
  position: relative;
  top: 3px;
}</style>
