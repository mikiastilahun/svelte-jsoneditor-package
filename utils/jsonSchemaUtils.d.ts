/**
 * Find enum options for given path in a JSONSchema
 * @param {JSON} schema
 * @param {JSON} [schemaDefinitions=undefined]
 * @param {Path} path
 * @returns {Array<any> | null}
 */
export declare function getJSONSchemaOptions(schema: any, schemaDefinitions: any, path: any): any;
/**
 * find an enum definition in a JSON schema, as property `enum` or inside
 * one of the schemas composites (`oneOf`, `anyOf`, `allOf`)
 *
 * Source: https://github.com/josdejong/jsoneditor/blob/develop/src/js/Node.js
 *
 * @param  {Object} schema
 * @return {Array | null} Returns the enum when found, null otherwise.
 * @private
 */
export declare function findEnum(schema: any): any;
/**
 * Return the part of a JSON schema matching given path.
 *
 * Source: https://github.com/josdejong/jsoneditor/blob/develop/src/js/Node.js
 *
 * @param {JSON} topLevelSchema
 * @param {JSON} schemaDefinitions
 * @param {Array.<string | number>} path
 * @param {Object} currentSchema
 * @return {Object | null}
 * @private
 */
export declare function findSchema(topLevelSchema: any, schemaDefinitions: any, path: any, currentSchema?: any): any;
