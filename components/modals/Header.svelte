<svelte:options immutable={true} />

<script>import { getContext } from 'svelte';
import Icon from 'svelte-awesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
export let title = 'Modal';
const { close } = getContext('simple-modal');
</script>

<div class="jse-header">
  <div class="jse-title">
    {title}
  </div>
  <button type="button" class="jse-close" on:click={close}>
    <Icon data={faTimes} />
  </button>
</div>

<style src="./Header.scss">.jse-header {
  display: flex;
  background: var(--jse-theme-color);
  color: var(--jse-menu-color);
}
.jse-header .jse-title {
  flex: 1;
  padding: 5px;
  vertical-align: middle;
}
.jse-header button {
  border: none;
  background: transparent;
  min-width: 32px;
  color: inherit;
  cursor: pointer;
}
.jse-header button:hover {
  background: rgba(255, 255, 255, 0.1);
}</style>
