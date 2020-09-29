/**
 *
 */

export const generateTooltipKey = () => Math.random().toString().slice(2);
export const label2Id = str => str.toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/\s+/g, "-");

// use Lodash instead of  ⇣ ⇣ ⇣ isEmptyObj
export const isObjectEmpty = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object;
export const isObjAvailable = (obj) => obj && !isObjectEmpty(obj);

export const isDataAvailable = (value) => {return value !== null && value !== undefined; }
export const isNil = (value) => typeof value === 'undefined' || value === null;

export const isArrayEmpty = (array) => !Array.isArray(array) || !array.length;
export const isArrayAvailable = (array) => Array.isArray(array) && array.length>0;



// export function isEmpty(str) {
//   return !str.replace(/\s+/, '').length;
// }

// export function isNotExist(value) {
//   return (typeof value === 'undefined' || value === null);
// }

// export function isNotBoolean(value) {
//   return typeof value === 'boolean';
// }







