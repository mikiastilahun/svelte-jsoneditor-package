<svelte:options immutable={true} />

<script>import Icon from 'svelte-awesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import NavigationBarDropdown from '../../../components/controls/navigationBar/NavigationBarDropdown.svelte';
import { getContext } from 'svelte';
const { openAbsolutePopup, closeAbsolutePopup } = getContext('absolute-popup');
export let path;
export let index;
export let onSelect;
export let getItems;
let refNavigationBarItem;
let open = false;
let popupId;
$: itemPath = path.slice(0, index);
$: selectedItem = path[index];
function handleSelectItem(item) {
    closeAbsolutePopup(popupId);
    onSelect(itemPath.concat(item));
}
function openDropdown() {
    if (refNavigationBarItem) {
        open = true;
        const props = {
            items: getItems(itemPath),
            selectedItem,
            onSelect: handleSelectItem
        };
        popupId = openAbsolutePopup(NavigationBarDropdown, props, {
            anchor: refNavigationBarItem,
            closeOnOuterClick: true,
            onClose: () => {
                open = false;
            }
        });
    }
}
</script>

<div class="jse-navigation-bar-item" bind:this={refNavigationBarItem}>
  <button
    type="button"
    class="jse-navigation-bar-button jse-navigation-bar-arrow"
    class:jse-open={open}
    on:click={openDropdown}
  >
    <Icon data={faAngleRight} />
  </button>
  {#if selectedItem !== undefined}
    <button
      type="button"
      class="jse-navigation-bar-button"
      on:click={() => handleSelectItem(selectedItem)}
    >
      {selectedItem}
    </button>
  {/if}
</div>

<style src="./NavigationBarItem.scss">.jse-navigation-bar-item {
  position: relative;
  display: flex;
}
.jse-navigation-bar-item button.jse-navigation-bar-button {
  font-family: inherit;
  font-size: inherit;
  padding: calc(0.5 * var(--jse-padding)) 2px;
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  outline: none;
  min-width: 2em;
  white-space: nowrap;
}
.jse-navigation-bar-item button.jse-navigation-bar-button:focus, .jse-navigation-bar-item button.jse-navigation-bar-button:hover {
  background: var(--jse-panel-button-background-highlight);
  color: var(--jse-panel-button-color-highlight);
}
.jse-navigation-bar-item button.jse-navigation-bar-button.jse-navigation-bar-arrow {
  padding: 2px var(--jse-padding) 0;
}
.jse-navigation-bar-item button.jse-navigation-bar-button.jse-navigation-bar-arrow.jse-open {
  background: var(--jse-navigation-bar-background);
  color: var(--jse-navigation-bar-dropdown-color);
}
.jse-navigation-bar-item:last-child {
  padding-right: var(--jse-padding);
}</style>
