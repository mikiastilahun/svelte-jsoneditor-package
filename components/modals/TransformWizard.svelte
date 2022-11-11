<svelte:options immutable={true} />

<script>import Select from 'svelte-select';
import { getNestedPaths } from '../../utils/arrayUtils.js';
import { pathToOption } from '../../utils/pathUtils.js';
import { createDebug } from '../../utils/debug.js';
import { isEqual } from 'lodash-es';
import { setIn } from 'immutable-json-patch';
const debug = createDebug('jsoneditor:TransformWizard');
export let json;
export let queryOptions = {};
export let onChange;
// options
$: jsonIsArray = Array.isArray(json);
$: paths = jsonIsArray ? getNestedPaths(json) : [];
$: pathsIncludingObjects = jsonIsArray ? getNestedPaths(json, true) : [];
$: fieldOptions = paths.map(pathToOption);
$: projectionOptions = pathsIncludingObjects ? pathsIncludingObjects.map(pathToOption) : [];
const filterRelationOptions = ['==', '!=', '<', '<=', '>', '>='].map((relation) => ({
    value: relation,
    label: relation
}));
const sortDirectionOptions = [
    { value: 'asc', label: 'ascending' },
    { value: 'desc', label: 'descending' }
];
// TODO: the binding with the select boxes is very cumbersome. Can we simplify this?
let filterPath = queryOptions?.filter?.path ? pathToOption(queryOptions.filter.path) : null;
let filterRelation = queryOptions?.filter?.relation
    ? filterRelationOptions.find((option) => option.value === queryOptions.filter.relation)
    : null;
let filterValue = queryOptions?.filter?.value || '';
let sortPath = queryOptions?.sort?.path ? pathToOption(queryOptions.sort.path) : null;
let sortDirection = queryOptions?.sort?.direction
    ? sortDirectionOptions.find((option) => option.value === queryOptions.sort.direction)
    : null;
let projectionPaths = queryOptions?.projection?.paths
    ? queryOptions.projection.paths.map(pathToOption)
    : null;
$: fieldPath = queryOptions?.filter?.path
    ? fieldOptions.find((option) => isEqual(option.value, queryOptions?.filter?.path))
    : null;
function changeFilterPath(path) {
    if (!isEqual(queryOptions?.filter?.path, path)) {
        debug('changeFilterPath', path);
        queryOptions = setIn(queryOptions, ['filter', 'path'], path, true);
        onChange(queryOptions);
    }
}
function changeFilterRelation(relation) {
    if (!isEqual(queryOptions?.filter?.relation, relation)) {
        debug('changeFilterRelation', relation);
        queryOptions = setIn(queryOptions, ['filter', 'relation'], relation, true);
        onChange(queryOptions);
    }
}
function changeFilterValue(value) {
    if (!isEqual(queryOptions?.filter?.value, value)) {
        debug('changeFilterValue', value);
        queryOptions = setIn(queryOptions, ['filter', 'value'], value, true);
        onChange(queryOptions);
    }
}
function changeSortPath(path) {
    if (!isEqual(queryOptions?.sort?.path, path)) {
        debug('changeSortPath', path);
        queryOptions = setIn(queryOptions, ['sort', 'path'], path, true);
        onChange(queryOptions);
    }
}
function changeSortDirection(direction) {
    if (!isEqual(queryOptions?.sort?.direction, direction)) {
        debug('changeSortDirection', direction);
        queryOptions = setIn(queryOptions, ['sort', 'direction'], direction, true);
        onChange(queryOptions);
    }
}
function changeProjectionPaths(paths) {
    if (!isEqual(queryOptions?.projection?.paths, paths)) {
        debug('changeProjectionPaths', paths);
        queryOptions = setIn(queryOptions, ['projection', 'paths'], paths, true);
        onChange(queryOptions);
    }
}
$: changeFilterPath(filterPath?.value || null);
$: changeFilterRelation(filterRelation?.value || null);
$: changeFilterValue(filterValue || null);
$: changeSortPath(sortPath?.value || null);
$: changeSortDirection(sortDirection?.value || null);
$: changeProjectionPaths(projectionPaths ? projectionPaths.map((item) => item.value) : null);
</script>

<table class="jse-transform-wizard">
  <tr>
    <th>Filter</th>
    <td>
      <div class="jse-horizontal">
        <Select
          containerClasses="jse-filter-path"
          showIndicator
          items={fieldOptions}
          bind:value={filterPath}
        />
        <Select
          containerClasses="jse-filter-relation"
          showIndicator
          items={filterRelationOptions}
          bind:value={filterRelation}
        />
        <input class="jse-filter-value" bind:value={filterValue} />
      </div>
    </td>
  </tr>
  <tr>
    <th>Sort</th>
    <td>
      <div class="jse-horizontal">
        <Select
          containerClasses="jse-sort-path"
          showIndicator
          items={fieldOptions}
          bind:value={sortPath}
        />
        <Select
          containerClasses="jse-sort-direction"
          showIndicator
          items={sortDirectionOptions}
          bind:value={sortDirection}
        />
      </div>
    </td>
  </tr>
  <tr>
    <th>Pick</th>
    <td>
      <div class="jse-horizontal">
        <Select
          containerClasses="jse-projection-paths"
          isMulti
          showIndicator
          items={projectionOptions}
          bind:value={projectionPaths}
        />
      </div>
    </td>
  </tr>
</table>

<style src="./TransformWizard.scss">table.jse-transform-wizard {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
}
table.jse-transform-wizard input {
  font-family: inherit;
  font-size: inherit;
}
table.jse-transform-wizard tr th {
  font-weight: normal;
  text-align: left;
  width: 60px;
}
table.jse-transform-wizard tr td .jse-horizontal {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: calc(0.5 * var(--jse-padding));
}
table.jse-transform-wizard tr td .jse-horizontal :global(.selectContainer.jse-filter-path) {
  flex: 4;
  margin-right: calc(0.5 * var(--jse-padding));
}
table.jse-transform-wizard tr td .jse-horizontal :global(.selectContainer.jse-filter-relation) {
  flex: 1.5;
  margin-right: calc(0.5 * var(--jse-padding));
}
table.jse-transform-wizard tr td .jse-horizontal :global(.selectContainer.jse-sort-path) {
  flex: 3;
  margin-right: calc(0.5 * var(--jse-padding));
}
table.jse-transform-wizard tr td .jse-horizontal :global(.selectContainer.jse-sort-direction) {
  flex: 1;
}
table.jse-transform-wizard tr td .jse-horizontal :global(.selectContainer.jse-projection-paths) {
  flex: 1;
}
table.jse-transform-wizard tr td .jse-horizontal :global(.selectContainer input) {
  box-sizing: border-box;
}
table.jse-transform-wizard tr td .jse-horizontal .jse-filter-value {
  flex: 4;
  padding: 4px 8px;
  border: var(--jse-input-border);
  border-radius: var(--jse-input-radius);
  outline: none;
  background: var(--jse-input-background);
  color: inherit;
}
table.jse-transform-wizard tr td .jse-horizontal .jse-filter-value:focus {
  border: var(--jse-input-border-focus);
}</style>
