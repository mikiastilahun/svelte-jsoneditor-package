/**
 * Get a named key from a key code.
 * For example:
 *     keyFromCode(65) returns 'A'
 *     keyFromCode(13) returns 'Enter'
 */
export declare function nameFromKeyCode(code: string): string;
/**
 * Get the active key combination from a keyboard event.
 * For example returns "Ctrl+Shift+Up" or "Ctrl+A"
 * @param {KeyboardEvent} event
 * @return {string}
 */
export declare function keyComboFromEvent(event: any): string;
/**
 * Create a function which can quickly find a keyBinding from a set of
 * keyBindings.
 * @param {Object.<String, String[]>} keyBindings
 * @return {function} Returns a findKeyBinding function
 */
export declare function createFindKeyBinding(keyBindings: any): (event: any) => any;
