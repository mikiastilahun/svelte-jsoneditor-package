<svelte:options immutable={true} />

<script>export let readOnly;
</script>

<div class="jse-welcome">
  <div class="jse-space jse-before" />
  <div class="jse-contents">
    Empty document
    {#if !readOnly}
      <ul>
        <li>Click inside the editor</li>
        <li>Paste clipboard data using <span class="jse-bold">Ctrl+V</span></li>
        <li>Create a new object by typing <span class="jse-bold">&lbrace;</span></li>
        <li>Create a new array by typing <span class="jse-bold">[</span></li>
      </ul>
    {/if}
  </div>
  <div class="jse-space jse-after" />
</div>

<style src="./Welcome.scss">@charset "UTF-8";
.jse-welcome {
  flex: 1;
  overflow: auto;
  font-family: var(--jse-font-family);
  font-size: var(--jse-font-size);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-left: var(--jse-main-border);
  border-right: var(--jse-main-border);
}
.jse-welcome:last-child {
  border-bottom: var(--jse-main-border);
}
.jse-welcome .jse-space.jse-before {
  flex: 1;
}
.jse-welcome .jse-space.jse-after {
  flex: 2;
}
.jse-welcome .jse-contents {
  margin: 2em var(--jse-padding) 0;
  color: var(--jse-panel-color-readonly);
}
.jse-welcome .jse-contents ul {
  list-style: "●";
  list-style-position: outside;
  padding-left: 20px;
}
.jse-welcome .jse-contents ul li {
  padding-left: 10px;
}
.jse-welcome .jse-contents ul li span.jse-bold {
  font-family: var(--jse-font-family-mono);
  font-weight: bold;
}</style>
