<svelte:options immutable={true} />

<script>import Icon from 'svelte-awesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { onDestroy, onMount } from 'svelte';
import { keyComboFromEvent } from '../../utils/keyBindings';
export let items = [];
export let title = undefined;
export let width = '120px';
let visible = false;
$: allItemsDisabled = items.every((item) => item.disabled === true);
function toggleShow() {
    const wasVisible = visible;
    // trigger *after* the handleClick which changes visibility to false
    setTimeout(() => (visible = !wasVisible));
}
function handleClick() {
    visible = false;
}
function handleKeyDown(event) {
    const combo = keyComboFromEvent(event);
    if (combo === 'Escape') {
        event.preventDefault();
        visible = false;
    }
}
onMount(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyDown);
});
onDestroy(() => {
    document.removeEventListener('click', handleClick);
    document.removeEventListener('keydown', handleKeyDown);
});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="jse-dropdown-button" {title} on:click={handleClick}>
  <slot name="defaultItem" />

  <button
    type="button"
    class="jse-open-dropdown"
    data-type="jse-open-dropdown"
    class:jse-visible={visible}
    on:click={toggleShow}
    disabled={allItemsDisabled}
  >
    <Icon data={faCaretDown} />
  </button>

  <div class="jse-dropdown-items" class:jse-visible={visible} style="width: {width};">
    <ul>
      {#each items as item}
        <li>
          <button
            type="button"
            on:click={() => item.onClick()}
            title={item.title}
            disabled={item.disabled}
          >
            {#if item.icon}
              <Icon data={item.icon} />
            {/if}
            {item.text}
          </button>
        </li>
      {/each}
    </ul>
  </div>
</div>

<style src="./DropdownButton.scss">.jse-dropdown-button {
  flex: 1;
  line-height: normal;
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font-family: var(--jse-font-family);
  font-size: var(--jse-font-size);
  padding: 5px;
  margin: 0;
  position: relative;
  padding: 0;
  display: flex;
}
.jse-dropdown-button ul {
  margin: 0;
  padding: 0;
}
.jse-dropdown-button ul li {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.jse-dropdown-button button.jse-open-dropdown {
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font-family: var(--jse-font-family);
  font-size: var(--jse-font-size);
  padding: 5px;
  margin: 0;
  width: 2em;
  background: var(--jse-context-menu-background);
  color: var(--jse-context-menu-color);
  border-radius: 0;
}
.jse-dropdown-button button.jse-open-dropdown.jse-visible {
  background: var(--jse-context-menu-background);
}
.jse-dropdown-button button.jse-open-dropdown:hover {
  background: var(--jse-context-menu-background-highlight);
}
.jse-dropdown-button button.jse-open-dropdown:disabled {
  color: var(--jse-context-menu-color-disabled);
  background: unset;
}
.jse-dropdown-button .jse-dropdown-items {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  background: var(--jse-context-menu-background);
  color: var(--jse-context-menu-color);
  box-shadow: var(--jse-controls-box-shadow);
}
.jse-dropdown-button .jse-dropdown-items.jse-visible {
  display: block;
}
.jse-dropdown-button .jse-dropdown-items button {
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font-family: var(--jse-font-family);
  font-size: var(--jse-font-size);
  padding: 5px;
  margin: 0;
  width: 100%;
  text-align: left;
  padding: var(--jse-padding);
  margin: 0;
}
.jse-dropdown-button .jse-dropdown-items button:hover {
  background: var(--jse-context-menu-background-highlight);
}
.jse-dropdown-button .jse-dropdown-items button:disabled {
  color: var(--jse-context-menu-color-disabled);
  background: unset;
}</style>
