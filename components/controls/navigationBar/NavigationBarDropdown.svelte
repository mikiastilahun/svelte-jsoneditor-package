<svelte:options immutable={true} />

<script>import { limit } from '../../../utils/arrayUtils';
import { truncate } from '../../../utils/stringUtils';
export let items;
export let selectedItem;
export let onSelect;
const MAX_ITEMS = 100;
const MAX_ITEM_CHARACTERS = 30;
</script>

<div class="jse-navigation-bar-dropdown">
  {#each limit(items, MAX_ITEMS) as item (item)}
    <button
      type="button"
      class="jse-navigation-bar-dropdown-item"
      class:jse-selected={item === selectedItem}
      on:click|stopPropagation={() => onSelect(item)}
      title={item}
    >
      {truncate(item, MAX_ITEM_CHARACTERS)}
    </button>
  {/each}
  {#if items.length > MAX_ITEMS}
    <button
      type="button"
      class="jse-navigation-bar-dropdown-item"
      title="Limited to {MAX_ITEMS} items"
    >
      ...
    </button>
  {/if}
</div>

<style src="./NavigationBarDropdown.scss">.jse-navigation-bar-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 3;
  background: var(--jse-navigation-bar-background);
  color: var(--jse-navigation-bar-dropdown-color);
  box-shadow: var(--jse-controls-box-shadow);
  display: flex;
  flex-direction: column;
  max-height: 300px;
  overflow: auto;
  min-width: 80px;
}
.jse-navigation-bar-dropdown button.jse-navigation-bar-dropdown-item {
  font-family: var(--jse-font-family-mono);
  font-size: var(--jse-font-size-mono);
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  outline: none;
  text-align: left;
  white-space: nowrap;
  box-sizing: border-box;
  padding: calc(0.5 * var(--jse-padding)) 36px;
}
.jse-navigation-bar-dropdown button.jse-navigation-bar-dropdown-item:focus, .jse-navigation-bar-dropdown button.jse-navigation-bar-dropdown-item:hover {
  background: var(--jse-navigation-bar-background-highlight);
}
.jse-navigation-bar-dropdown button.jse-navigation-bar-dropdown-item.jse-selected {
  background: var(--jse-navigation-bar-dropdown-color);
  color: var(--jse-navigation-bar-background);
}</style>
