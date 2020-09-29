import React from 'react';
import { storiesOf } from '@storybook/react';
import { STORIES_NAME } from './constants';

import DemoTippy from '../demo/DemoTippy';

storiesOf(STORIES_NAME, module)
  .add('Demo Tippy', () => (
    <main>
      <div className="stories-box">
        <DemoTippy />
      </div>
    </main>
  ),
)

