<script>import { splitValue } from '../../../../logic/search';
import { addNewLineSuffix } from '../../../../utils/domUtils';
export let text;
export let searchResultItems;
$: parts = splitValue(String(text), searchResultItems);
</script>

{#each parts as part}
  {#if part.type === 'normal'}
    {part.text}
  {:else}
    <span class="jse-highlight" class:jse-active={part.active}>{addNewLineSuffix(part.text)}</span>
  {/if}
{/each}

<style src="./SearchResultHighlighter.scss">.jse-highlight {
  background-color: var(--jse-search-match-color);
  outline: var(--jse-search-match-outline);
}
.jse-highlight.jse-active {
  background-color: var(--jse-search-match-active-color);
  outline: var(--jse-search-match-active-outline);
}</style>
