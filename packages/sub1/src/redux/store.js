import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

export const initStore = (pageReducer, appName) => {
  const composeEnhanced = composeWithDevTools({
    name: appName,
  });
  return createStore(pageReducer, composeEnhanced(applyMiddleware(thunk)));
};
