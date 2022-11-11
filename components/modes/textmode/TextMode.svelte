<svelte:options immutable={true} />

<script>import { faExclamationTriangle, faWrench } from '@fortawesome/free-solid-svg-icons';
import { createDebug } from '../../../utils/debug';
import { immutableJSONPatch, revertJSONPatch } from 'immutable-json-patch';
import jsonrepair from 'jsonrepair';
import { debounce, isEqual, uniqueId } from 'lodash-es';
import { onDestroy, onMount } from 'svelte';
import { JSON_STATUS_INVALID, JSON_STATUS_REPAIRABLE, JSON_STATUS_VALID, MAX_DOCUMENT_SIZE_TEXT_MODE, TEXT_MODE_ONCHANGE_DELAY } from '../../../constants';
import { activeElementIsChildOf, createNormalizationFunctions, getWindow } from '../../../utils/domUtils';
import { formatSize } from '../../../utils/fileUtils';
import { findTextLocation, getText } from '../../../utils/jsonUtils';
import { createFocusTracker } from '../../controls/createFocusTracker.js';
import Message from '../../controls/Message.svelte';
import ValidationErrorsOverview from '../../controls/ValidationErrorsOverview.svelte';
import TextMenu from './menu/TextMenu.svelte';
import { basicSetup, EditorView } from 'codemirror';
import { Compartment, EditorState } from '@codemirror/state';
import { keymap, ViewUpdate } from '@codemirror/view';
import { indentWithTab, redo, redoDepth, undo, undoDepth } from '@codemirror/commands';
import { linter, lintGutter } from '@codemirror/lint';
import { json as jsonLang } from '@codemirror/lang-json';
import { indentUnit } from '@codemirror/language';
import { closeSearchPanel, openSearchPanel, search } from '@codemirror/search';
import jsonSourceMap from 'json-source-map';
import StatusBar from './StatusBar.svelte';
import { highlighter } from './codemirror/codemirror-theme';
import { ValidationSeverity } from '../../../types';
import { isContentParseError, isContentValidationErrors } from '../../../typeguards';
import memoizeOne from 'memoize-one';
import { validateText } from '../../../logic/validation';
export let readOnly;
export let mainMenuBar;
export let statusBar;
export let externalContent;
export let indentation;
export let tabSize;
export let escapeUnicodeCharacters;
export let parser;
export let validator;
export let validationParser;
export let onChange;
export let onSwitchToTreeMode;
export let onError;
export let onFocus;
export let onBlur;
export let onRenderMenu;
export let onSortModal;
export let onTransformModal;
const debug = createDebug('jsoneditor:TextMode');
const formatCompactKeyBinding = {
    key: 'Mod-i',
    run: handleFormat,
    shift: handleCompact,
    preventDefault: true
};
const isSSR = typeof window === 'undefined';
debug('isSSR:', isSSR);
let codeMirrorRef;
let codeMirrorView;
let domTextMode;
let editorState;
let onChangeDisabled = false;
let acceptTooLarge = false;
let validationErrors = [];
const linterCompartment = new Compartment();
const editableCompartment = new Compartment(); // needed to prevent a mobile keyboard from opening when readonly
const readOnlyCompartment = new Compartment();
const indentUnitCompartment = new Compartment();
const tabSizeCompartment = new Compartment();
let content = externalContent;
let text = getText(content, indentation, parser); // text is just a cached version of content.text or parsed content.json
let editorDisabled = disableTextEditor(text, acceptTooLarge);
$: isNewDocument = text.length === 0;
$: normalization = createNormalizationFunctions({
    escapeControlCharacters: false,
    escapeUnicodeCharacters
});
$: setCodeMirrorContent(externalContent);
$: updateLinter(validator);
$: updateIndentation(indentation);
$: updateTabSize(tabSize);
$: updateReadOnly(readOnly);
// force updating the text when escapeUnicodeCharacters changes
let previousEscapeUnicodeCharacters = escapeUnicodeCharacters;
$: {
    if (previousEscapeUnicodeCharacters !== escapeUnicodeCharacters) {
        previousEscapeUnicodeCharacters = escapeUnicodeCharacters;
        forceUpdateText();
    }
}
onMount(async () => {
    if (isSSR) {
        return;
    }
    try {
        codeMirrorView = createCodeMirrorView({
            target: codeMirrorRef,
            initialText: !editorDisabled ? normalization.escapeValue(text) : '',
            readOnly,
            indentation
        });
        focus();
    }
    catch (err) {
        // TODO: report error to the user
        console.error(err);
    }
});
onDestroy(() => {
    if (codeMirrorView) {
        debug('Destroy CodeMirror editor');
        codeMirrorView.destroy();
    }
});
let canUndo = false;
let canRedo = false;
const sortModalId = uniqueId();
const transformModalId = uniqueId();
export function focus() {
    if (codeMirrorView) {
        debug('focus');
        codeMirrorView.focus();
    }
}
// modalOpen is true when one of the modals is open.
// This is used to track whether the editor still has focus
let modalOpen = false;
createFocusTracker({
    onMount,
    onDestroy,
    getWindow: () => getWindow(domTextMode),
    hasFocus: () => (modalOpen && document.hasFocus()) || activeElementIsChildOf(domTextMode),
    onFocus,
    onBlur
});
export function patch(operations) {
    debug('patch', operations);
    const previousJson = parser.parse(text);
    const updatedJson = immutableJSONPatch(previousJson, operations);
    const undo = revertJSONPatch(previousJson, operations);
    setCodeMirrorContent({
        text: parser.stringify(updatedJson, null, indentation)
    });
    return {
        json: updatedJson,
        previousJson,
        undo,
        redo: operations
    };
}
function handleFormat() {
    debug('format');
    if (readOnly) {
        return;
    }
    try {
        const json = parser.parse(text);
        setCodeMirrorContent({
            text: parser.stringify(json, null, indentation)
        });
    }
    catch (err) {
        onError(err);
    }
}
function handleCompact() {
    debug('compact');
    if (readOnly) {
        return;
    }
    try {
        const json = parser.parse(text);
        setCodeMirrorContent({
            text: parser.stringify(json)
        });
    }
    catch (err) {
        onError(err);
    }
}
function handleRepair() {
    debug('repair');
    if (readOnly) {
        return;
    }
    try {
        setCodeMirrorContent({
            text: jsonrepair(text)
        });
        jsonStatus = JSON_STATUS_VALID;
        jsonParseError = undefined;
    }
    catch (err) {
        onError(err);
    }
}
function handleSort() {
    if (readOnly) {
        return;
    }
    try {
        const json = parser.parse(text);
        modalOpen = true;
        onSortModal({
            id: sortModalId,
            json,
            selectedPath: [],
            onSort: async (operations) => {
                debug('onSort', operations);
                patch(operations);
            },
            onClose: () => {
                modalOpen = false;
                focus();
            }
        });
    }
    catch (err) {
        onError(err);
    }
}
/**
 * This method is exposed via JSONEditor.transform
 * @param {Object} options
 * @property {string} [id]
 * @property {JSONPath} [selectedPath]
 * @property {({ operations: JSONPatchDocument, json: JSONValue, transformedJson: JSONValue }) => void} [onTransform]
 * @property {() => void} [onClose]
 */
export function openTransformModal({ id, selectedPath, onTransform, onClose }) {
    try {
        const json = parser.parse(text);
        modalOpen = true;
        onTransformModal({
            id: id || transformModalId,
            json,
            selectedPath,
            onTransform: onTransform
                ? (operations) => {
                    onTransform({
                        operations,
                        json,
                        transformedJson: immutableJSONPatch(json, operations)
                    });
                }
                : (operations) => {
                    debug('onTransform', operations);
                    patch(operations);
                },
            onClose: () => {
                modalOpen = false;
                focus();
                if (onClose) {
                    onClose();
                }
            }
        });
    }
    catch (err) {
        onError(err);
    }
}
function handleTransform() {
    if (readOnly) {
        return;
    }
    openTransformModal({
        selectedPath: []
    });
}
function handleToggleSearch() {
    if (codeMirrorView) {
        // TODO: figure out the proper way to detect whether the search panel is open
        if (codeMirrorRef && codeMirrorRef.querySelector('.cm-search')) {
            closeSearchPanel(codeMirrorView);
        }
        else {
            openSearchPanel(codeMirrorView);
        }
    }
}
function handleUndo() {
    if (readOnly) {
        return;
    }
    if (codeMirrorView) {
        undo(codeMirrorView);
        focus();
    }
}
function handleRedo() {
    if (readOnly) {
        return;
    }
    if (codeMirrorView) {
        redo(codeMirrorView);
        focus();
    }
}
function handleAcceptTooLarge() {
    acceptTooLarge = true;
    setCodeMirrorContent(externalContent, true);
}
function cancelLoadTooLarge() {
    // copy the latest contents of the text editor again into text
    onChangeCodeMirrorValue();
}
/**
 * @param {ValidationError} validationError
 **/
function handleSelectValidationError(validationError) {
    debug('select validation error', validationError);
    const richValidationError = toRichValidationError(validationError);
    // we take "to" as head, not as anchor, because the scrollIntoView will
    // move to the head, and when a large whole object is selected as a whole,
    // we want to scroll to the start of the object and not the end
    setSelection(richValidationError.from, richValidationError.to);
    focus();
}
function handleSelectParseError(parseError) {
    debug('select parse error', parseError);
    const richParseError = toRichParseError(parseError, false);
    // we take "to" as head, not as anchor, because the scrollIntoView will
    // move to the head, and when a large whole object is selected as a whole,
    // we want to scroll to the start of the object and not the end
    setSelection(richParseError.from, richParseError.to);
    focus();
}
/**
 * @param {number} anchor
 * @param {number} head
 **/
function setSelection(anchor, head) {
    debug('setSelection', { anchor, head });
    if (codeMirrorView) {
        codeMirrorView.dispatch(codeMirrorView.state.update({
            selection: { anchor, head },
            scrollIntoView: true
        }));
    }
}
function handleDoubleClick(event, view) {
    // When the user double-clicked right from a bracket [ or {,
    // select the contents of the array or object
    if (view.state.selection.ranges.length === 1) {
        const range = view.state.selection.ranges[0];
        const selectedText = text.slice(range.from, range.to);
        if (selectedText === '{' || selectedText === '[') {
            const jsmap = jsonSourceMap.parse(text);
            const path = Object.keys(jsmap.pointers).find((path) => {
                const pointer = jsmap.pointers[path];
                return pointer.value?.pos === range.from;
            });
            const pointer = jsmap.pointers[path];
            if (path && pointer && pointer.value && pointer.valueEnd) {
                debug('pointer found, selecting inner contents of path:', path, pointer);
                const anchor = pointer.value.pos + 1;
                const head = pointer.valueEnd.pos - 1;
                setSelection(anchor, head);
            }
        }
    }
}
function createLinter() {
    return linter(linterCallback, { delay: TEXT_MODE_ONCHANGE_DELAY });
}
function createCodeMirrorView({ target, initialText, readOnly, indentation }) {
    debug('Create CodeMirror editor', { readOnly, indentation });
    const state = EditorState.create({
        doc: initialText,
        extensions: [
            keymap.of([indentWithTab, formatCompactKeyBinding]),
            linterCompartment.of(createLinter()),
            lintGutter(),
            basicSetup,
            highlighter,
            EditorView.domEventHandlers({
                dblclick: handleDoubleClick
            }),
            EditorView.updateListener.of((update) => {
                editorState = update.state;
                if (update.docChanged) {
                    onChangeCodeMirrorValueDebounced();
                }
            }),
            jsonLang(),
            search({
                top: true
            }),
            readOnlyCompartment.of(EditorState.readOnly.of(readOnly)),
            editableCompartment.of(EditorView.editable.of(!readOnly)),
            tabSizeCompartment.of(EditorState.tabSize.of(tabSize)),
            indentUnitCompartment.of(createIndentUnit(indentation)),
            EditorView.lineWrapping
        ]
    });
    codeMirrorView = new EditorView({
        state,
        parent: target
    });
    return codeMirrorView;
}
function getCodeMirrorValue() {
    return codeMirrorView ? normalization.unescapeValue(codeMirrorView.state.doc.toString()) : '';
}
function toRichValidationError(validationError) {
    const { path, message } = validationError;
    const { line, column, from, to } = findTextLocation(normalization.escapeValue(text), path);
    return {
        path,
        line,
        column,
        from,
        to,
        message,
        severity: ValidationSeverity.warning,
        actions: []
    };
}
function toRichParseError(parseError, isRepairable) {
    const { line, column, position, message } = parseError;
    return {
        path: null,
        line,
        column,
        from: position || 0,
        to: position || 0,
        severity: ValidationSeverity.error,
        message,
        actions: isRepairable && !readOnly
            ? [
                {
                    name: 'Auto repair',
                    apply: () => handleRepair()
                }
            ]
            : null
    };
}
function toDiagnostic(error) {
    return {
        from: error.from,
        to: error.to,
        message: error.message,
        actions: error.actions,
        severity: error.severity,
        source: undefined
    };
}
function setCodeMirrorContent(newContent, forceUpdate = false) {
    const newText = getText(newContent, indentation, parser);
    editorDisabled = disableTextEditor(newText, acceptTooLarge);
    if (editorDisabled) {
        debug('externalContent not applying text: editor is disabled');
        return;
    }
    const isChanged = !isEqual(newContent, content);
    debug('setCodeMirrorContent', { isChanged, forceUpdate });
    if (!codeMirrorView || (!isChanged && !forceUpdate)) {
        return;
    }
    const previousContent = content;
    content = newContent;
    text = newText;
    // keep state
    // to reset state: codeMirrorView.setState(EditorState.create({doc: text, extensions: ...}))
    codeMirrorView.dispatch({
        changes: {
            from: 0,
            to: codeMirrorView.state.doc.length,
            insert: normalization.escapeValue(text)
        }
    });
    updateCanUndoRedo();
    if (isChanged) {
        emitOnChange(content, previousContent);
    }
}
/**
 * Force refreshing the editor, for example after changing the font size
 * to update the positioning of the line numbers in the gutter
 */
export function refresh() {
    debug('refresh');
    const index = codeMirrorView.state.doc.length;
    // a trick to force Code Mirror to re-render the gutter values:
    // insert a space at the end and then remove it again
    codeMirrorView.dispatch({
        changes: { from: index, to: index, insert: ' ' }
    });
    codeMirrorView.dispatch({
        changes: { from: index, to: index + 1, insert: '' }
    });
}
function forceUpdateText() {
    debug('forceUpdateText', { escapeUnicodeCharacters });
    if (codeMirrorView) {
        codeMirrorView.dispatch({
            changes: {
                from: 0,
                to: codeMirrorView.state.doc.length,
                insert: normalization.escapeValue(text)
            }
        });
    }
}
function onChangeCodeMirrorValue() {
    if (onChangeDisabled || !codeMirrorView) {
        return;
    }
    const codeMirrorText = getCodeMirrorValue();
    const isChanged = codeMirrorText !== text;
    debug('onChangeCodeMirrorValue', { isChanged });
    if (!isChanged) {
        return;
    }
    const previousContent = content;
    text = codeMirrorText;
    content = { text };
    updateCanUndoRedo();
    emitOnChange(content, previousContent);
}
function updateLinter(validator) {
    debug('updateLinter', validator);
    if (!codeMirrorView) {
        return;
    }
    codeMirrorView.dispatch({
        effects: linterCompartment.reconfigure(createLinter())
    });
}
function updateIndentation(indentation) {
    if (codeMirrorView) {
        debug('updateIndentation', indentation);
        codeMirrorView.dispatch({
            effects: indentUnitCompartment.reconfigure(createIndentUnit(indentation))
        });
    }
}
function updateTabSize(tabSize) {
    if (codeMirrorView) {
        debug('updateTabSize', tabSize);
        codeMirrorView.dispatch({
            effects: tabSizeCompartment.reconfigure(EditorState.tabSize.of(tabSize))
        });
    }
}
function updateReadOnly(readOnly) {
    if (codeMirrorView) {
        debug('updateReadOnly', readOnly);
        codeMirrorView.dispatch({
            effects: [
                readOnlyCompartment.reconfigure(EditorState.readOnly.of(readOnly)),
                editableCompartment.reconfigure(EditorView.editable.of(!readOnly))
            ]
        });
    }
}
function createIndentUnit(indentation) {
    return indentUnit.of(typeof indentation === 'number' ? ' '.repeat(indentation) : indentation);
}
function updateCanUndoRedo() {
    canUndo = undoDepth(codeMirrorView.state) > 0;
    canRedo = redoDepth(codeMirrorView.state) > 0;
    debug({ canUndo, canRedo });
}
// debounce the input: when pressing Enter at the end of a line, two change
// events are fired: one with the new Return character, and a second with
// indentation added on the new line. This causes a race condition when used
// for example in React. Debouncing the onChange events also results in not
// firing a change event with every character that a user types, but only as
// soon as the user stops typing.
const onChangeCodeMirrorValueDebounced = debounce(onChangeCodeMirrorValue, TEXT_MODE_ONCHANGE_DELAY);
function emitOnChange(content, previousContent) {
    if (onChange) {
        onChange(content, previousContent, {
            contentErrors: validate(),
            patchResult: null
        });
    }
}
function disableTextEditor(text, acceptTooLarge) {
    const tooLarge = text && text.length > MAX_DOCUMENT_SIZE_TEXT_MODE;
    return tooLarge && !acceptTooLarge;
}
let jsonStatus = JSON_STATUS_VALID;
let jsonParseError = null;
function linterCallback() {
    if (editorDisabled) {
        return [];
    }
    const contentErrors = validate();
    if (isContentParseError(contentErrors)) {
        const { parseError, isRepairable } = contentErrors;
        return [toDiagnostic(toRichParseError(parseError, isRepairable))];
    }
    if (isContentValidationErrors(contentErrors)) {
        return contentErrors.validationErrors.map(toRichValidationError).map(toDiagnostic);
    }
    return [];
}
export function validate() {
    debug('validate:start');
    onChangeCodeMirrorValueDebounced.flush();
    const contentErrors = memoizedValidateText(normalization.escapeValue(text), validator, parser, validationParser);
    if (isContentParseError(contentErrors)) {
        jsonStatus = contentErrors.isRepairable ? JSON_STATUS_REPAIRABLE : JSON_STATUS_INVALID;
        jsonParseError = contentErrors.parseError;
        validationErrors = [];
    }
    else {
        jsonStatus = JSON_STATUS_VALID;
        jsonParseError = null;
        validationErrors = contentErrors.validationErrors;
    }
    debug('validate:end');
    return contentErrors;
}
// because onChange returns the validation errors and there is also a separate listener,
// we would execute validation twice. Memoizing the last result solves this.
const memoizedValidateText = memoizeOne(validateText);
$: repairActions =
    jsonStatus === JSON_STATUS_REPAIRABLE && !readOnly
        ? [
            {
                icon: faWrench,
                text: 'Auto repair',
                title: 'Automatically repair JSON',
                onClick: handleRepair
            }
        ]
        : [];
</script>

<div class="jse-text-mode" class:no-main-menu={!mainMenuBar} bind:this={domTextMode}>
  {#if mainMenuBar}
    <TextMenu
      {readOnly}
      onFormat={handleFormat}
      onCompact={handleCompact}
      onSort={handleSort}
      onTransform={handleTransform}
      onToggleSearch={handleToggleSearch}
      onUndo={handleUndo}
      onRedo={handleRedo}
      canFormat={!isNewDocument}
      canCompact={!isNewDocument}
      canSort={!isNewDocument}
      canTransform={!isNewDocument}
      {canUndo}
      {canRedo}
      {onRenderMenu}
    />
  {/if}

  {#if !isSSR}
    {#if editorDisabled}
      <Message
        icon={faExclamationTriangle}
        type="error"
        message={`The JSON document is larger than ${formatSize(
          MAX_DOCUMENT_SIZE_TEXT_MODE,
          1024
        )}, ` +
          `and may crash your browser when loading it in text mode. Actual size: ${formatSize(
            text.length,
            1024
          )}.`}
        actions={[
          {
            text: 'Open anyway',
            title: 'Open the document in text mode. This may freeze or crash your browser.',
            onClick: handleAcceptTooLarge
          },
          {
            text: 'Open in tree mode',
            title: 'Open the document in tree mode. Tree mode can handle large documents.',
            onClick: onSwitchToTreeMode
          },
          {
            text: 'Cancel',
            title: 'Cancel opening this large document.',
            onClick: cancelLoadTooLarge
          }
        ]}
      />
    {/if}

    <div class="jse-contents" class:jse-hidden={editorDisabled} bind:this={codeMirrorRef} />

    {#if statusBar}
      <StatusBar {editorState} />
    {/if}

    {#if !editorDisabled}
      {#if jsonParseError}
        <Message
          type="error"
          icon={faExclamationTriangle}
          message={jsonParseError.message}
          actions={repairActions}
          onClick={() => handleSelectParseError(jsonParseError)}
        />
      {/if}

      <ValidationErrorsOverview {validationErrors} selectError={handleSelectValidationError} />
    {/if}
  {:else}
    <div class="jse-contents">
      <div class="jse-loading-space" />
      <div class="jse-loading">loading...</div>
    </div>
  {/if}
</div>

<style src="./TextMode.scss">.jse-text-mode {
  flex: 1;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background: var(--jse-background-color);
}
.jse-text-mode.no-main-menu {
  border-top: var(--jse-main-border);
}
.jse-text-mode .jse-contents {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
  min-height: 0;
  border-left: var(--jse-main-border);
  border-right: var(--jse-main-border);
}
.jse-text-mode .jse-contents:last-child {
  border-bottom: var(--jse-main-border);
}
.jse-text-mode .jse-contents.jse-hidden {
  visibility: hidden;
}
.jse-text-mode .jse-contents :global(.cm-editor) {
  flex: 1;
  overflow: hidden;
}
.jse-text-mode .jse-contents :global(.cm-editor) :global(.cm-scroller) {
  font-family: var(--jse-font-family-mono);
  font-size: var(--jse-font-size-mono);
  line-height: var(--jse-line-height);
  color: var(--jse-delimiter-color);
}
.jse-text-mode .jse-contents :global(.cm-editor) :global(.cm-gutters) {
  background: var(--jse-panel-background);
  color: var(--jse-panel-color-readonly);
  border-right: var(--jse-panel-border);
}
.jse-text-mode .jse-contents :global(.cm-editor) :global(.cm-activeLine),
.jse-text-mode .jse-contents :global(.cm-editor) :global(.cm-activeLineGutter) {
  background: var(--jse-active-line-background-color);
}
.jse-text-mode .jse-contents :global(.cm-editor) :global(.cm-selectionBackground) {
  background: var(--jse-selection-background-color);
}
.jse-text-mode .jse-contents :global(.cm-editor) :global(.cm-searchMatch) {
  background-color: var(--jse-search-match-color);
  outline: var(--jse-search-match-outline);
}
.jse-text-mode .jse-contents :global(.cm-editor) :global(.cm-searchMatch.cm-searchMatch-selected) {
  background-color: var(--jse-search-match-active-color);
  outline: var(--jse-search-match-active-outline);
}
.jse-text-mode .jse-contents :global(.cm-editor) :global(.cm-selectionMatch) {
  background-color: var(--jse-search-match-background-color);
}
.jse-text-mode .jse-contents :global(.cm-editor) :global(.cm-foldPlaceholder) {
  background: var(--jse-tag-background);
  color: var(--jse-tag-color);
  border: none;
  padding: 0 var(--jse-padding);
}
.jse-text-mode .jse-contents :global(.cm-editor) :global(.cm-tooltip) {
  font-size: var(--jse-font-size);
  font-family: var(--jse-font-family);
  color: var(--jse-tooltip-color);
  background: var(--jse-tooltip-background);
  border: var(--jse-tooltip-border);
}
.jse-text-mode .jse-contents :global(.cm-editor) :global(.cm-diagnosticAction) {
  background: var(--jse-tooltip-action-button-color);
  background: var(--jse-tooltip-action-button-background);
}
.jse-text-mode .jse-contents :global(.cm-editor) :global(.cm-panels) {
  border-bottom: var(--jse-panel-border);
}
.jse-text-mode .jse-contents :global(.cm-editor) :global(.cm-search) {
  background: var(--jse-panel-background);
  color: var(--jse-panel-color);
  font-family: var(--jse-font-family);
  font-size: var(--jse-font-size);
}
.jse-text-mode .jse-contents :global(.cm-editor) :global(.cm-search input) {
  font-family: var(--jse-font-family);
  font-size: var(--jse-font-size-text-mode-search);
  color: var(--jse-input-color);
  border: var(--jse-input-border);
  background: var(--jse-input-background);
  margin-right: 2px;
}
.jse-text-mode .jse-contents :global(.cm-editor) :global(.cm-search button) {
  font-family: var(--jse-font-family);
  font-size: var(--jse-font-size-text-mode-search);
  color: var(--jse-panel-button-color);
  background: var(--jse-panel-button-background);
  border: none;
  cursor: pointer;
  text-transform: capitalize;
  padding: calc(0.5 * var(--jse-padding)) var(--jse-padding);
  margin: 0;
}
.jse-text-mode .jse-contents :global(.cm-editor) :global(.cm-search button):hover {
  color: var(--jse-panel-button-color-highlight);
  background: var(--jse-panel-button-background-highlight);
}
.jse-text-mode .jse-contents :global(.cm-editor) :global(.cm-search label) {
  font-family: var(--jse-font-family);
  font-size: var(--jse-font-size-text-mode-search);
  padding-left: var(--jse-padding);
}
.jse-text-mode .jse-contents :global(.cm-editor) :global(.cm-search label input) {
  margin-right: 2px;
}
.jse-text-mode .jse-contents :global(.cm-editor) :global(.cm-search button[name="close"]) {
  width: 32px;
  height: 32px;
  font-size: 24px;
  line-height: 24px;
  padding: 0;
  right: 0;
  top: -4px;
}
.jse-text-mode .jse-contents :global(.cm-editor) :global(.cm-cursor-primary) {
  border-color: var(--jse-text-color);
}
.jse-text-mode .jse-contents .jse-loading-space {
  flex: 1;
}
.jse-text-mode .jse-contents .jse-loading {
  flex: 2;
  text-align: center;
  color: var(--jse-panel-color-readonly);
  box-sizing: border-box;
  font-family: var(--jse-font-family);
  font-size: var(--jse-font-size);
}</style>
