<svelte:options immutable={true} />

<script>import Icon from 'svelte-awesome';
export let type = 'success'; // 'success' or 'error'
export let icon = undefined;
export let message = undefined;
export let actions = [];
export let onClick = undefined;
function handleClick() {
    if (onClick) {
        onClick();
    }
}
</script>

<div class="jse-message jse-{type}">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="jse-text" class:jse-clickable={onClick !== null} on:click={handleClick}>
    {#if icon}
      <Icon data={icon} />
    {/if}
    {message}
  </div>
  <div class="jse-actions">
    {#each actions as action}
      <button
        type="button"
        on:click={() => {
          if (action.onClick) {
            action.onClick()
          }
        }}
        on:mousedown={() => {
          if (action.onMouseDown) {
            action.onMouseDown()
          }
        }}
        class="jse-button jse-action jse-primary"
        title={action.title}
        disabled={action.disabled}
      >
        {#if action.icon}
          <Icon data={action.icon} />
        {/if}
        {action.text}
      </button>
    {/each}
  </div>
</div>

<style src="./Message.scss">.jse-message {
  font-family: var(--jse-font-family-mono);
  font-size: var(--jse-font-size-mono);
  padding: var(--jse-padding);
  display: flex;
  gap: var(--jse-padding);
  flex-wrap: wrap;
  align-items: center;
}
.jse-message.jse-success {
  background: var(--jse-message-success-background);
  color: var(--jse-message-success-color);
}
.jse-message .jse-text {
  flex: 1;
  min-width: 60%;
}
.jse-message .jse-text.jse-clickable {
  cursor: pointer;
}
.jse-message .jse-text.jse-clickable:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.jse-message.jse-error {
  background: var(--jse-message-error-background);
  color: var(--jse-message-error-color);
}
.jse-message.jse-warning {
  background: var(--jse-message-warning-background);
  color: var(--jse-message-warning-color);
}
.jse-message.jse-info {
  background: var(--jse-message-info-background);
  color: var(--jse-message-info-color);
}
.jse-message .jse-actions {
  display: flex;
  gap: var(--jse-padding);
}
.jse-message .jse-actions button.jse-action {
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font-family: var(--jse-font-family);
  font-size: var(--jse-font-size);
  padding: 5px;
  margin: 0;
  background: var(--jse-message-action-background);
  color: inherit;
  padding: calc(0.5 * var(--jse-padding)) var(--jse-padding);
}
.jse-message .jse-actions button.jse-action:hover {
  background: var(--jse-message-action-background-highlight);
}</style>
