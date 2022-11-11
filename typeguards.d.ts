import type { ContentErrors, ContentParseError, ContentValidationErrors, MenuSpaceItem } from './types.js';
export declare function isMenuSpaceItem(item: unknown): item is MenuSpaceItem;
export declare function isContentParseError(contentErrors: ContentErrors): contentErrors is ContentParseError;
export declare function isContentValidationErrors(contentErrors: ContentErrors): contentErrors is ContentValidationErrors;
