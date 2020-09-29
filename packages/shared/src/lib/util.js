import moment from 'moment';
export const isEmptyObj = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object;
export const isObjAvailable = (obj) => obj && !isEmptyObj(obj);
export const generateTooltipKey = () => Math.random().toString().slice(2);
export const isDataAvailable = (value) => {return value !== null && value !== undefined; }
export const isArrayAvailable = (array) => Array.isArray(array) && array.length>0;

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

export function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, '\\$&');
}

export function getTimeFrameByPeriodKey(period, frame) {
  let startDate = moment()
    .subtract(30 - 1, 'day')
    .utc()
    .format('YYYY-MM-DD');
  let endDate = moment()
    .utc()
    .format('YYYY-MM-DD');
  switch (period) {
    case 'today':
      startDate = moment()
        .utc()
        .format('YYYY-MM-DD');
      break;
    case 'yesterday':
      startDate = moment()
        .utc()
        .format('YYYY-MM-DD');
      break;
    case 'last7days':
      startDate = moment()
        .subtract(7 - 1, 'day')
        .utc()
        .format('YYYY-MM-DD');
      break;
    case 'lastmonth':
      startDate = moment()
        .subtract(30 - 1, 'day')
        .utc()
        .format('YYYY-MM-DD');
      break;
    case 'last2months':
      startDate = moment()
        .subtract(60 - 1, 'day')
        .utc()
        .format('YYYY-MM-DD');
      break;
    case 'last3months':
      startDate = moment()
        .subtract(90 - 1, 'day')
        .utc()
        .format('YYYY-MM-DD');
      break;
    case 'last4months':
      startDate = moment()
        .subtract(120 - 1, 'day')
        .utc()
        .format('YYYY-MM-DD');
      break;
    case 'last6months':
      startDate = moment()
        .subtract(180 - 1, 'day')
        .utc()
        .format('YYYY-MM-DD');
      break;
    case 'last9months':
      startDate = moment()
        .subtract(270 - 1, 'day')
        .utc()
        .format('YYYY-MM-DD');
      break;
    case 'last12months':
      startDate = moment()
        .subtract(365 - 1, 'day')
        .utc()
        .format('YYYY-MM-DD');
      break;
    case 'custom':
      if (frame) {
        startDate = moment.utc(frame.startDate).format('YYYY-MM-DD');
        endDate = moment.utc(frame.endDate).format('YYYY-MM-DD');
      }
      break;
    default:
      return {
        period: 'lastmonth',
        startDate,
        endDate,
      };
  }
  return {
    period,
    startDate,
    endDate,
  };
}