import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhanced = composeWithDevTools({
  name: 'Message Right Rail',
});
const initStore = pageReducer => createStore(pageReducer, composeEnhanced(applyMiddleware(thunk)));

export function createReduxStore(reducers) {
  return initStore(reducers);
}

function defaultStateSelector(getState) {
  return getState();
}

function thunkWithScopedStateMiddleware({ dispatch, getState }) {
  return next => (action, stateSelector = defaultStateSelector) => {
    if (typeof action === 'function') {
      return action(dispatch, () => stateSelector(getState));
    }
    return next(action);
  };
}
