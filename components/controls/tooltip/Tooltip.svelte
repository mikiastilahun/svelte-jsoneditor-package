<script>export let text;
</script>

<div class="jse-tooltip">
  {text}
</div>

<style src="./Tooltip.scss">.jse-tooltip {
  font-family: var(--jse-font-family);
  font-size: var(--jse-font-size);
  line-height: normal;
  padding: calc(0.5 * var(--jse-padding)) var(--jse-padding);
  border-radius: 3px;
  background: var(--jse-context-menu-background);
  color: var(--jse-context-menu-color);
  white-space: nowrap;
  box-shadow: var(--jse-controls-box-shadow);
}</style>
