<script>import Icon from 'svelte-awesome';
import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons';
export let queryLanguages;
export let queryLanguageId;
export let onChangeQueryLanguage;
function handleChangeQueryLanguage(newQueryLanguageId) {
    queryLanguageId = newQueryLanguageId;
    onChangeQueryLanguage(newQueryLanguageId);
}
</script>

<div class="jse-select-query-language">
  <div class="jse-select-query-language-container">
    {#each queryLanguages as queryLanguage}
      <button
        type="button"
        on:click={() => handleChangeQueryLanguage(queryLanguage.id)}
        class="jse-query-language"
        class:selected={queryLanguage.id === queryLanguageId}
        title={`Select ${queryLanguage.name} as query language`}
      >
        {#if queryLanguage.id === queryLanguageId}
          <Icon data={faCheckSquare} />
        {:else}
          <Icon data={faSquare} />
        {/if}
        {queryLanguage.name}
      </button>
    {/each}
  </div>
</div>

<style src="./SelectQueryLanguage.scss">.jse-select-query-language {
  position: relative;
  width: 32px;
}
.jse-select-query-language .jse-select-query-language-container {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  box-shadow: var(--jse-controls-box-shadow);
}
.jse-select-query-language .jse-select-query-language-container .jse-query-language {
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font-family: var(--jse-font-family);
  font-size: var(--jse-font-size);
  padding: 5px;
  margin: 0;
  text-align: left;
  padding: var(--jse-padding) calc(2 * var(--jse-padding));
  white-space: nowrap;
  color: var(--jse-context-menu-color);
  background: var(--jse-context-menu-background);
}
.jse-select-query-language .jse-select-query-language-container .jse-query-language:hover {
  background: var(--jse-context-menu-background-highlight);
}</style>
