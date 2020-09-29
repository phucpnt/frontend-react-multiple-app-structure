import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as globActions, selectors as globSelectors } from 'sub1/redux/global';

export function connectComponentSimple(Component) {
  return function ConnectedComponentSimple(props) {
    const state = useSelector((state) => {
      return {
        afield: globSelectors.afield(state),
      };
    });
    const dispatch = useDispatch();
    const method1 = () => dispatch(globActions.act1());

    return <Component {...props} onSomething={method1} someData={state} />;
  };
}
