<svelte:options immutable={true} />

<script>import { existsIn, getIn } from 'immutable-json-patch';
import { range } from 'lodash-es';
import { isObject, isObjectOrArray } from '../../../utils/typeUtils';
import { createMultiSelection } from '../../../logic/selection';
import { createDebug } from '../../../utils/debug';
import { caseInsensitiveNaturalCompare } from '../../../logic/sort';
import Icon from 'svelte-awesome';
import { faClose, faEdit } from '@fortawesome/free-solid-svg-icons';
import NavigationBarItem from './NavigationBarItem.svelte';
import NavigationBarPathEditor from './NavigationBarPathEditor.svelte';
const debug = createDebug('jsoneditor:NavigationBar');
export let json;
export let documentState;
export let onSelect;
export let onError;
export let pathParser;
let refNavigationBar;
let refEditButton;
let editing = false;
$: path = documentState.selection ? documentState.selection.focusPath : [];
$: hasNextItem = isObjectOrArray(getIn(json, path));
function scrollToLastItem() {
    setTimeout(() => {
        if (refNavigationBar && refNavigationBar.scrollTo) {
            const left = refNavigationBar.scrollWidth - refNavigationBar.clientWidth;
            if (left > 0) {
                debug('scrollTo ', left);
                refNavigationBar.scrollTo({ left, behavior: 'smooth' });
            }
        }
    });
}
// trigger scrollToLastItem when path changes
$: scrollToLastItem(path);
function getItems(path) {
    debug('get items for path', path);
    const node = getIn(json, path);
    if (Array.isArray(node)) {
        return range(0, node.length).map(String);
    }
    else if (isObject(node)) {
        const keys = Object.keys(node);
        const sortedKeys = keys.slice(0);
        sortedKeys.sort(caseInsensitiveNaturalCompare);
        return sortedKeys;
    }
    else {
        // never happens but just for robustness...
        return [];
    }
}
function pathExists(path) {
    return existsIn(json, path);
}
function handleSelect(path) {
    debug('select path', JSON.stringify(path));
    onSelect(createMultiSelection(json, path, path));
}
function toggleEditing() {
    editing = !editing;
}
function handleCloseEditor() {
    editing = false;
}
function handleChangePath(path) {
    handleCloseEditor();
    handleSelect(path);
}
</script>

<div class="jse-navigation-bar" bind:this={refNavigationBar}>
  {#if !editing}
    {#each path as item, index (index)}
      <NavigationBarItem {getItems} {path} {index} onSelect={handleSelect} />
    {/each}
    {#if hasNextItem}
      <NavigationBarItem {getItems} {path} index={undefined} onSelect={handleSelect} />
    {/if}
  {:else}
    <NavigationBarPathEditor
      {path}
      onClose={handleCloseEditor}
      onChange={handleChangePath}
      {onError}
      {pathExists}
      {pathParser}
    />
  {/if}

  <button
    type="button"
    class="jse-navigation-bar-edit"
    class:flex={!editing}
    class:editing
    title={editing ? 'Cancel editing the selected path' : 'Edit the selected path'}
    on:click={toggleEditing}
    bind:this={refEditButton}
  >
    <span class="jse-navigation-bar-space">
      <!-- ensure the right height (arrows have less height than the text) -->
      {!isObjectOrArray(json) && !editing ? 'Navigation bar' : '\u00A0'}
    </span>

    <Icon data={editing ? faClose : faEdit} />
  </button>
</div>

<style src="./NavigationBar.scss">.jse-navigation-bar {
  font-family: var(--jse-font-family-mono);
  font-size: var(--jse-font-size-mono);
  background: var(--jse-panel-background);
  color: var(--jse-panel-button-color);
  padding: 0;
  margin: 0;
  display: flex;
  overflow: auto;
  border-left: var(--jse-main-border);
  border-right: var(--jse-main-border);
}
.jse-navigation-bar .jse-navigation-bar-edit {
  font-family: var(--jse-font-family-mono);
  font-size: var(--jse-font-size-mono);
  padding: calc(0.5 * var(--jse-padding)) var(--jse-padding);
  color: var(--jse-panel-color-readonly);
  background: transparent;
  border: none;
  display: flex;
  cursor: pointer;
  outline: none;
  align-items: center;
}
.jse-navigation-bar .jse-navigation-bar-edit.flex {
  flex: 1;
}
.jse-navigation-bar .jse-navigation-bar-edit:focus, .jse-navigation-bar .jse-navigation-bar-edit:hover, .jse-navigation-bar .jse-navigation-bar-edit.editing {
  background: var(--jse-panel-button-background-highlight);
  color: var(--jse-panel-button-color-highlight);
  transition: color 0.2s ease-in, background 0.2s ease-in;
}
.jse-navigation-bar .jse-navigation-bar-edit .jse-navigation-bar-space {
  flex: 1;
  text-align: left;
}</style>
