import qs from 'query-string';

function getApiAccessToken() {
  // return '82ee14e3-926b-41ba-a423-bcf9fea56f9b-e1df3';
  return window.REACT_APP_apiAccessToken;
}

// let debugCount = 0;

export function fetchJson(url, options = {}) {
  const queryParams = options.queryParams;
  // console.info(`%c fetch #${++debugCount} >> `, 'background: orange; color: white', url, queryParams);

  if (queryParams && queryParams.startDate) {
    queryParams['start-date'] = queryParams.startDate;
    delete queryParams.startDate;
  }
  if (queryParams && queryParams.endDate) {
    queryParams['end-date'] = queryParams.endDate;
    delete queryParams.endDate;
  }

  const strQueryParams = queryParams ? '?' + qs.stringify(queryParams) : '';

  const apiAccessToken = getApiAccessToken();
  const headers = {
    Accept: 'application/json',
    ...options.headers,
  };

  if (apiAccessToken) {
    headers.Authorization = `Bearer ${getApiAccessToken()}`;
  }

  return fetch(url + strQueryParams, {
    ...options,
    headers,
  })
    .then((response, reject) => {
      if (!response.ok) {
        return Promise.reject({ repsonseStatus: response.statusText });
      }
      return response;
    })
    .then((response) => response.json());
}

export class FetchError extends Error {
  params = null;
  constructor(params) {
    super('Fetch error');
    this.params = params;
  }
}
