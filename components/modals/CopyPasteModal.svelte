<svelte:options immutable={true} />

<script>import { getContext } from 'svelte';
import { IS_MAC } from '../../utils/navigatorUtils.js';
import Header from './Header.svelte';
const { close } = getContext('simple-modal');
const ctrl = IS_MAC ? '⌘' : 'Ctrl';
</script>

<div class="jse-modal jse-copy-paste">
  <Header title="Copying and pasting" />

  <div class="jse-contents">
    <div>These actions are unavailable via the menu. Please use:</div>

    <div class="jse-shortcuts">
      <div class="jse-shortcut">
        <div class="jse-key">
          {ctrl}+C
        </div>
        for copy
      </div>
      <div class="jse-shortcut">
        <div class="jse-key">
          {ctrl}+X
        </div>
        for cut
      </div>
      <div class="jse-shortcut">
        <div class="jse-key">
          {ctrl}+V
        </div>
        for paste
      </div>
    </div>

    <div class="jse-actions">
      <button type="button" class="jse-primary" on:click={close}> Close </button>
    </div>
  </div>
</div>

<style src="./CopyPasteModal.scss">.jse-modal {
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

.jse-modal.jse-copy-paste .jse-shortcuts {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: calc(2 * var(--jse-padding)) 0;
}
.jse-modal.jse-copy-paste .jse-shortcuts .jse-shortcut .jse-key {
  font-size: 200%;
  color: var(--jse-theme-color);
}</style>
