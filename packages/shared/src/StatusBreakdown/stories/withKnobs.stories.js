import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { STORIES_NAME } from './constants';

import {
  text,
  number,
  boolean,
  color,
  select,
  radios,
  array,
  date,
  button,
  object,
  files,
  optionsKnob as options,
} from '@storybook/addon-knobs';

import StatusBreakdown from '../';
import StatusBreakdownReadme from '../README.md';
import StatusBreakdownSource from '!!raw-loader!../';

storiesOf(STORIES_NAME, module)
  .add('withKnobs', () => {
    // const age = number('Age', 70, { range: true, min: 0, max: 90, step: 5 });
    const items = [
      {
        color: color('Background 01', '#dd4a39'),
        name: text('Status 01', 'Bad'),
        value: number('Number 01', 12, { range: true, min: 0, max: 900 }),
      },
      {
        color: color('Background 02', '#f39c13'),
        name: text('Status 02', 'Average'),
        value: number('Number 02', 2, { range: true, min: 0, max: 900 }),
      },
      {
        color: color('Background 03', '#02c0ef'),
        name: text('Status 03', 'Good'),
        value: number('Number 03', 17, { range: true, min: 0, max: 900 }),
      },
    ];

    return (
      <div
        style={{
          boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.05)',
          borderRadius: 3,
          padding: 20,
          color: '#555',
          display: 'inline-block',
          width: "100%",
        }}
      >
        <StatusBreakdown items={items}/>
      </div>
    )
  },
  {
    notes: { markdown: StatusBreakdownReadme },
    source: StatusBreakdownSource,
  }
)
