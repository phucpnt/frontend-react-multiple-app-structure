import React from 'react';
import { storiesOf } from '@storybook/react';
import withStyle from 'react-jss';

import App from './src/app';

const Todo = withStyle({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1: {
    color: '#ff00aa',
    fontSize: '56px',
  },
})(({ classes }) => (
  <div className={classes.container}>
    <h1 className={classes.h1}>Todo</h1>
  </div>
));

storiesOf('Sub1/App', module).add('default', () => {
  return <App />;
});
