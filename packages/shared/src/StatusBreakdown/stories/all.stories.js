import React from 'react';
import { storiesOf } from '@storybook/react';
import { STORIES_NAME } from './constants';

import StatusBreakdown from '../';
import StatusBreakdownReadme from '../README.md';
import StatusBreakdownSource from '!!raw-loader!../';

storiesOf(STORIES_NAME, module)
  .add('All', () => (
    <main>
      <h1>will write a test components will all case</h1>
      <p>1. Default Case:</p>
      <div
        style={{
          boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.05)',
          borderRadius: 3,
          padding: 20,
          color: '#555',
        }}
      >
        <StatusBreakdown />
      </div>
    </main>
  ),
  {
    notes: { markdown: StatusBreakdownReadme },
    source: StatusBreakdownSource,
  }
)
