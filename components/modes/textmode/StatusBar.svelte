<script>export let editorState;
let pos;
$: pos = editorState?.selection?.main?.head;
let line;
$: line = editorState?.doc?.lineAt(pos);
let lineNumber;
$: lineNumber = line ? line.number : undefined;
let columnNumber;
$: columnNumber = line ? pos - line.from + 1 : undefined;
let charCount;
$: charCount = editorState?.selection?.ranges?.reduce((count, range) => {
    return count + range.to - range.from;
}, 0);
</script>

<div class="jse-status-bar">
  {#if lineNumber !== undefined}
    <div class="jse-status-bar-info">Line: {lineNumber}</div>
  {/if}

  {#if columnNumber !== undefined}
    <div class="jse-status-bar-info">Column: {columnNumber}</div>
  {/if}

  {#if charCount !== undefined && charCount > 0}
    <div class="jse-status-bar-info">Selection: {charCount} characters</div>
  {/if}
</div>

<style src="./StatusBar.scss">.jse-status-bar {
  background: var(--jse-panel-background);
  color: var(--jse-panel-color-readonly);
  font-family: var(--jse-font-family-mono);
  font-size: var(--jse-font-size-mono);
  margin: 0;
  border-top: var(--jse-panel-border);
  border-left: var(--jse-main-border);
  border-right: var(--jse-main-border);
  display: flex;
  gap: var(--jse-padding);
}
.jse-status-bar:last-child {
  border-bottom: var(--jse-main-border);
}
.jse-status-bar .jse-status-bar-info {
  padding: 2px;
}</style>
