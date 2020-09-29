import React from 'react';
import { storiesOf } from '@storybook/react';
import { STORIES_NAME } from './constants';

import Demo01 from '../demo/Demo01';
// import Original from '../demo/Original';

storiesOf(STORIES_NAME, module)
  .add('Demo01', () => (
    <main>
      <h1 className="stories-h1">Demo 01</h1>
      <p className="stories-description">Expect: Tooltip will disappear after click items inside</p>
      <div className="stories-box">
        <Demo01 />
      </div>

      {/* <h1 className="stories-h1">Original</h1>
      <div className="stories-box">
        <Original />
      </div> */}
    </main>
  ),
)

