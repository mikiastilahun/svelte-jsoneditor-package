<svelte:options immutable={true} />

<script>import { getContext } from 'svelte';
import Icon from 'svelte-awesome';
import { faCog, faTimes } from '@fortawesome/free-solid-svg-icons';
import SelectQueryLanguage from '../controls/selectQueryLanguage/SelectQueryLanguage.svelte';
export let queryLanguages;
export let queryLanguageId;
export let onChangeQueryLanguage;
let refConfigButton;
let popupId;
const { close } = getContext('simple-modal');
const { openAbsolutePopup, closeAbsolutePopup } = getContext('absolute-popup');
function openConfig() {
    const props = {
        queryLanguages,
        queryLanguageId,
        onChangeQueryLanguage: (selectedQueryLanguage) => {
            closeAbsolutePopup(popupId);
            onChangeQueryLanguage(selectedQueryLanguage);
        }
    };
    popupId = openAbsolutePopup(SelectQueryLanguage, props, {
        position: 'bottom',
        offsetTop: -2,
        offsetLeft: 0,
        anchor: refConfigButton,
        closeOnOuterClick: true
    });
}
</script>

<div class="jse-header">
  <div class="jse-title">Transform</div>
  {#if queryLanguages.length > 1}
    <button
      type="button"
      bind:this={refConfigButton}
      class="jse-config"
      on:click={openConfig}
      title="Select a query language"
    >
      <Icon data={faCog} />
    </button>
  {/if}
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
