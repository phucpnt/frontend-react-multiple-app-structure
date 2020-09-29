import React from 'react';
import { storiesOf } from '@storybook/react';
import { STORIES_NAME } from './constants';
import withStyles from 'react-jss';

import Loading from '../loading';

const LoadingCusto = withStyles({
  yourCustom: {
    border: '1px solid #eee',
    height: 300,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    '& img': {
      height: 70,
    }
  }
})(({classes}) => <Loading className={classes.yourCustom} />);

storiesOf(STORIES_NAME, module)
  .add('Loading', () => (
    <main>
      <h1 className="stories-h1">Default</h1>
      <Loading />
      <Loading style={{ position: "relative", height: 100}} />

      <h1 className="stories-h1">Case 02 ::: </h1>
      <div className="stories-box" style={{
        height: 170,
        display: "flex",
        alignItems: "center",
        // extra
        position: "relative",
        justifyContent: "center",
        }}>
        <Loading />
      </div>

      <h1 className="stories-h1">Case 03 ::: custom className</h1>
      <LoadingCusto />

      <h1 className="stories-h1">Case 04 ::: have background</h1>
      <div className="stories-box" style={{
        background: "#635662",
        height: 150,
        display: "flex",
        alignItems: "center",
        // extra
        justifyContent: "center",
        }}>
        <Loading />
      </div>

    </main>
  ),
)
