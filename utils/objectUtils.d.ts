import type { JSONValue, JSONPath } from 'immutable-json-patch';
export declare function traverse(json: JSONValue, callback: (value: JSONValue, path: JSONPath, json: JSONValue) => boolean | void): void;
