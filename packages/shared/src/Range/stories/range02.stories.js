import React from 'react';
import { storiesOf } from '@storybook/react';
import { STORIES_NAME } from './constants';

import Range02 from '../Range02';

const DATA = [
  { min: 0,     max: 100,     current: 50 },
  { min: -100,  max: 200,     current: 50 },
  { min: -100,  max: 2621,    current: 3 },
  { min: -100,  max: 2621,    current: 2.5423728813559325 },
  { min: -99,   max: -18,     current: -7 },
  { min: -99,   max: -57,     current: -31 },
  { min: -99,   max: -57,     current: -31.254647592823005 },
]

storiesOf(STORIES_NAME, module)
  .add('Range02', () => (
    <main>
      {DATA.map((item,index) => (
        <div
          key={`demoall-${index}`}
          style={{
            display: 'flex',
            boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
            borderRadius: 3,
            width: 780,
            padding: 20,
            color: '#555',
            margin: '20px auto',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h1 style={{fontSize: 18, marginBottom: 10}}>Case: {index+1}</h1>
            <p style={{color: '#1EA7FD',}}>Min: {item.min}</p>
            <p style={{color: '#1EA7FD',}}>Max: {item.max}</p>
            <p style={{color: '#1EA7FD',}}>Current: {item.current}</p>
          </div>
          <Range02 {...item} />
        </div>
      ))}
    </main>
  ))