import React from 'react';
import Range01 from '../Range01';
import { STORIES_NAME } from './constants';

import {
  withKnobs,
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

const DemoWithKnobs = () => {
  const items = [6.24, -5.6, -3.09, 3.39, 2.49, -3.16];

  return (
    <div
      style={{
        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        borderRadius: 3,
        padding: 20,
        color: '#555',
      }}
    >
      <Range01 items={items}/>
    </div>
  )
}

export default DemoWithKnobs;
