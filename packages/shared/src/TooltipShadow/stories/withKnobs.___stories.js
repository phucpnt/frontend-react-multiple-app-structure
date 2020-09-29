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

import StatusBreakdown from '../StatusBreakdown';

// cho nhập color - hoặc xử dụng color picker
// enter name
// value sẽ là thanh trượt có giới hạn

storiesOf(STORIES_NAME, module)
  .add('withKnobs', () => {
    const items = [
      {
        color: '#dd4a39', // red
        name: 'Bad',
        value: number('Bad', 12),
      },
      {
        color: '#f39c13', // yellow
        name: 'Average',
        value: number('Average', 15),
      },
      {
        color: '#02c0ef', // blue
        name: 'Good',
        value: number('Good', 17),
      },
    ];

    return (
      <div
        style={{
          boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.05)',
          borderRadius: 3,
          padding: 20,
          color: '#555',
        }}
      >
        <StatusBreakdown items={items}/>
      </div>
    )
  })

