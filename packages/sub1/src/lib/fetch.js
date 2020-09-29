import * as qs from 'query-string';

// let debugCount = 0;
const API_ACCESS_TOKEN = window.REACT_APP_apiAccessToken;

export function fetchJson(url, options = {}) {
  const queryParams = options.queryParams;

  if (queryParams && queryParams.startDate) {
    queryParams['start-date'] = queryParams.startDate;
    delete queryParams.startDate;
  }
  if (queryParams && queryParams.endDate) {
    queryParams['end-date'] = queryParams.endDate;
    delete queryParams.endDate;
  }

  const strQueryParams = queryParams
    ? '?' +
      qs.stringify(queryParams, {
        arrayFormat: 'comma',
      })
    : '';

  // console.info('querystring....', strQueryParams);

  return fetch(url + strQueryParams, {
    ...options,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      ...options.headers,
    },
  })
    .then((response, reject) => {
      if (!response.ok) {
        return Promise.reject({ repsonseStatus: response.statusText });
      }
      return response;
    })
    .then(response => response.json());
}

export class FetchError extends Error {
  params = null;
  constructor(params) {
    super('Fetch error');
    this.params = params;
  }
}
