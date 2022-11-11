import type { RenderValueComponentDescription, RenderValueProps } from '../../types';
import type { JSONValue } from 'immutable-json-patch';
/**
 * Search the JSON schema for enums defined at given props.path. If found,
 * return an EnumValue renderer. If not found, return null. In that case you
 * have to fallback on the default valueRender function
 */
export declare function renderJSONSchemaEnum(props: RenderValueProps, schema: JSONValue, schemaDefinitions: JSONValue): RenderValueComponentDescription[];
