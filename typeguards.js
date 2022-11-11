export function isMenuSpaceItem(item) {
    return item && item['space'] === true && Object.keys(item).length === 1;
}
export function isContentParseError(contentErrors) {
    return typeof contentErrors['parseError'] === 'object' && contentErrors['parseError'] !== null;
}
export function isContentValidationErrors(contentErrors) {
    return Array.isArray(contentErrors['validationErrors']);
}
