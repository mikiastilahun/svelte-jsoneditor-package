<svelte:options immutable={true} />

<script>
  import { getContext } from 'svelte'
  import JSONRepairComponent from './repair/JSONRepairComponent.svelte'

  export let text
  export let onParse
  export let onRepair
  export let onApply
  export let onRenderMenu

  const { close } = getContext('simple-modal')

  function handleApply(repairedText) {
    close()
    onApply(repairedText)
  }

  function handleCancel() {
    close()
  }
</script>

<div class="jse-modal jse-repair">
  <JSONRepairComponent
    bind:text
    {onParse}
    {onRepair}
    onApply={handleApply}
    onCancel={handleCancel}
    {onRenderMenu}
  />
</div>

<style src="./JSONRepairModal.scss">.jse-modal.jse-repair {
  flex: 1;
  display: flex;
  flex-direction: column;
  font-family: var(--jse-font-family);
  font-size: var(--jse-font-size);
  line-height: normal;
  background: var(--jse-background-color);
  color: var(--jse-text-color);
}</style>
