import React from 'react';
import { storiesOf } from '@storybook/react';
import { STORIES_NAME } from './constants';

import DayPickerRange from "../DayPickerRange";
import README from '../README.md';
import source from '!!raw-loader!../DayPickerRange';

storiesOf(STORIES_NAME, module)
  .add('DayPickerRangeController', () => (
    <main>
      <div className="stories-box">
        <DayPickerRange />
      </div>
    </main>
  ),
  {
    notes: { markdown: README },
    source,
  }
)