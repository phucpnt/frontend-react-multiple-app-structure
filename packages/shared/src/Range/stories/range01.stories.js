import React from 'react';
import { storiesOf } from '@storybook/react';
import { STORIES_NAME } from './constants';

import Range01 from '../Range01';
import Range01Readme from '../Range01.md';
import Range01Source from '!!raw-loader!../Range01';

const DATA = [
  [6.24, 6.24, -5.6, -5.6, -3.09, -3.09, 3.39, 2.49, -3.16],
  [13.33, 13.33, 11.75, 11.75, 13.06, 13.06, 10.86, 12.77, 10.49],
  [-12.73, -12.73, -12.34, -12.34, -12.91, -12.91, -14.17, -14.18, -22.4],
  [6.24, -5.6, -3.09, -3.39, -2.49, -3.16],
  [1.69, 100.69, 1.74, 1.74, 1.76, 1.76, 2.18, 2.38, 1.61],
  [2.73, 2.73, 2.34, 2.34, 2.91, 2.91, 4.17, 4.18, 2.4],
  [1.69, 1.69, 1.74, 1.74, 1.76, 1.76, 2.18, 2.38, 1.61]
];

storiesOf(STORIES_NAME, module)
  .add('Range01', () => (
    <main>
      {DATA.map((data,index) => (
        <div
          key={`demoall-${index}`}
          style={{
            boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
            borderRadius: 3,
            width: 780,
            padding: 20,
            color: '#555',
            margin: '20px auto',
          }}
        >
          <h1 style={{fontSize: 18}}>Case: {index+1}</h1>
          <span style={{color: '#1EA7FD',}}>[{data.toString()}]</span>
          <Range01 items={data} />
        </div>
      ))}
    </main>
  ),
  {
    notes: { markdown: Range01Readme },
    source: Range01Source,
  }
)

