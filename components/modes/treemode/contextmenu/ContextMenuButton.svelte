<svelte:options immutable={true} />

<script>import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Icon from 'svelte-awesome';
import { CONTEXT_MENU_EXPLANATION, CONTEXT_MENU_HEIGHT, CONTEXT_MENU_WIDTH } from '../../../../constants.js';
export let selected;
export let onContextMenu;
function handleClick(event) {
    let buttonElem = event.target;
    while (buttonElem && buttonElem.nodeName !== 'BUTTON') {
        buttonElem = buttonElem.parentNode;
    }
    if (buttonElem) {
        onContextMenu({
            anchor: buttonElem,
            left: 0,
            top: 0,
            width: CONTEXT_MENU_WIDTH,
            height: CONTEXT_MENU_HEIGHT,
            offsetTop: 2,
            offsetLeft: 0,
            showTip: true
        });
    }
}
</script>

<button
  type="button"
  class="jse-context-menu-button"
  class:jse-selected={selected}
  title={CONTEXT_MENU_EXPLANATION}
  on:click={handleClick}
>
  <Icon data={faCaretDown} />
</button>

<style src="./ContextMenuButton.scss">.jse-context-menu-button {
  position: absolute;
  top: calc(-0.5 * var(--jse-context-menu-button-size));
  right: calc(-0.5 * var(--jse-context-menu-button-size));
  width: var(--jse-context-menu-button-size);
  height: var(--jse-context-menu-button-size);
  padding: 0;
  margin: 0;
  z-index: 2;
  cursor: pointer;
  background: transparent;
  border-radius: 2px;
  background: var(--jse-context-menu-button-background);
  color: var(--jse-context-menu-button-color);
  border: none;
  box-shadow: var(--jse-controls-box-shadow);
}
.jse-context-menu-button:hover {
  background: var(--jse-context-menu-button-background-highlight);
}</style>
