<svelte:options immutable={true} />

<script>import { getExpandItemsSections } from '../../../logic/expandItemsSections';
import { appendToJSONPointer } from 'immutable-json-patch';
import { isMultiSelection } from '../../../logic/selection';
export let visibleSections;
export let sectionIndex;
export let total;
export let path;
export let pointer;
export let selection;
export let onExpandSection;
$: visibleSection = visibleSections[sectionIndex];
$: startIndex = visibleSection.end;
$: endIndex = visibleSections[sectionIndex + 1] ? visibleSections[sectionIndex + 1].start : total;
$: selected = isMultiSelection(selection)
    ? selection.pointersMap[appendToJSONPointer(pointer, startIndex)] === true
    : false;
$: expandItemsSections = getExpandItemsSections(startIndex, endIndex);
// TODO: this is duplicated from the same function in JSONNode
function getIndentationStyle(level) {
    return `margin-left: calc(${level} * var(--jse-indent-size))`;
}
function handleMouseMove(event) {
    // prevent the whole array from being selected whilst dragging over
    // a section with collapsed items
    event.stopPropagation();
}
</script>

<div
  class="jse-collapsed-items"
  class:jse-selected={selected}
  on:mousemove={handleMouseMove}
  style={getIndentationStyle(path.length + 2)}
>
  <div>
    <div class="jse-text">Items {startIndex}-{endIndex}</div>
    {#each expandItemsSections as expandItemsSection}<button
        type="button"
        class="jse-expand-items"
        on:click={() => onExpandSection(path, expandItemsSection)}
      >
        show {expandItemsSection.start}-{expandItemsSection.end}
      </button>
    {/each}
  </div>
</div>

<style src="./CollapsedItems.scss">div.jse-collapsed-items {
  font-family: var(--jse-font-family);
  font-size: var(--jse-font-size);
  color: var(--jse-collapsed-items-link-color);
  padding: calc(0.5 * var(--jse-padding));
  border: 8px solid transparent;
  border-width: 8px 0;
  background-color: transparent;
  background-image: linear-gradient(var(--jse-collapsed-items-background-color), var(--jse-collapsed-items-background-color)), linear-gradient(to bottom right, transparent 50.5%, var(--jse-collapsed-items-background-color) 50.5%), linear-gradient(to bottom left, transparent 50.5%, var(--jse-collapsed-items-background-color) 50.5%), linear-gradient(to top right, transparent 50.5%, var(--jse-collapsed-items-background-color) 50.5%), linear-gradient(to top left, transparent 50.5%, var(--jse-collapsed-items-background-color) 50.5%);
  background-repeat: repeat, repeat-x, repeat-x, repeat-x, repeat-x;
  background-position: 0 0, 8px 0, 8px 0, 8px 100%, 8px 100%;
  background-size: auto auto, 16px 16px, 16px 16px, 16px 16px, 16px 16px;
  background-clip: padding-box, border-box, border-box, border-box, border-box;
  background-origin: padding-box, border-box, border-box, border-box, border-box;
  display: flex;
}
div.jse-collapsed-items div.jse-text,
div.jse-collapsed-items button.jse-expand-items {
  margin: 0 calc(0.5 * var(--jse-padding));
}
div.jse-collapsed-items div.jse-text {
  display: inline;
}
div.jse-collapsed-items button.jse-expand-items {
  font-family: inherit;
  font-size: inherit;
  color: var(--jse-collapsed-items-link-color);
  background: none;
  border: none;
  padding: 0;
  text-decoration: underline;
  cursor: pointer;
}
div.jse-collapsed-items button.jse-expand-items:hover, div.jse-collapsed-items button.jse-expand-items:focus {
  color: var(--jse-collapsed-items-link-color-highlight);
}</style>
