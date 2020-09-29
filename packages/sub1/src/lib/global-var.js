export const LOGIN_URL =
  window.REACT_APP_LOGIN_URL || process.env.REACT_APP_LOGIN_URL;
export const LOGOUT_URL =
  window.REACT_APP_LOGOUT_URL || process.env.REACT_APP_LOGOUT_URL;

export const API_HOST =
  process.env.NODE_ENV !== "development"
    ? window.REACT_APP_API_HOST || process.env.REACT_APP_API_HOST
    : `http://your-api-hosted.com/`;
