import { fetchJson } from 'sub1/lib/fetch';
import { EP } from 'sub1/lib/endpoints';
import { produce } from 'immer';

const initState = {
  field1: 234,
  field2: 'abc',
};

const act = (action) => `GLOBAL/${action}`;

export const actions = {
  act1: () => (dispatch) => {
    dispatch({ type: act('ACT1'), payload: { field1: 123 } });
  },
};

const selectors = {};
selectors.afield = (state) => {
  return state.field1;
};
export { selectors };

export default function reducer(state = initState, action) {
  switch (action.type) {
    case act('ACT1'): {
      state = produce(state, (draft) => {
        draft.field1 = action.payload.field1;
      });
    }
    default:
  }
  return state;
}
