import uniqBy from 'lodash/uniqBy';

export const isEmptyObj = obj => Object.keys(obj).length === 0 && obj.constructor === Object;
export const isObjAvailable = obj => obj && !isEmptyObj(obj);
export const generateTooltipKey = () =>
  Math.random()
    .toString()
    .slice(2);
export const isNumberAvailable = value => {
  return value !== null && value !== undefined && !isNaN(value);
};
export const isArrayAvailable = array => Array.isArray(array) && array.length > 0;
export const isEmpty = str => !str.replace(/\s+/, '').length;

export function getScrollbarWidth() {
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  let widthNoScroll = 0;
  let widthWithScroll = 0;
  if (document.body) {
    document.body.appendChild(outer);
    widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = 'scroll';
    // add innerdiv
    const inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);
    widthWithScroll = inner.offsetWidth;
    // remove divs
    outer.parentNode.removeChild(outer);
  }
  return widthNoScroll - widthWithScroll;
}

export function getValue(fn, defaultVal) {
  try {
    let val = fn();
    return val === undefined ? defaultVal : val;
  } catch (e) {
    return defaultVal;
  }
}

export function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, '\\$&');
}

export function searchOnObjects(obj, key, keyword) {
  let objects = [];
  for (let i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (typeof obj[i] == 'object') {
      objects = objects.concat(searchOnObjects(obj[i], key, keyword));
    } else if (i === key && keyword.test(obj[i])) {
      //
      objects.push(obj);
    } else if (keyword.test(obj[i]) && key === '') {
      if (objects.lastIndexOf(obj) === -1) {
        objects.push(obj);
      }
    }
  }
  let uniqueobjects = uniqBy(objects, 'id');
  return uniqueobjects;
}

/**
 * copies ::: https://silvantroxler.ch/2017/avoid-cannot-read-property-of-undefined/
 * use it like this
      getSafe(() => obj.a.lot.of.properties);

 * or add an optional default value
      getSafe(() => obj.a.lot.of.properties, 'nothing');
 */
export function getSafe(fn, defaultVal) {
  try {
    let val = fn();
    return val === undefined ? defaultVal : val;
  } catch (e) {
    return defaultVal;
  }
}

