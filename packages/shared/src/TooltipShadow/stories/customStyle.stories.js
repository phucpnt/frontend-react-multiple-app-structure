import React from 'react';
import { storiesOf } from '@storybook/react';
import { mergeWith } from 'lodash';
import withStyles from 'react-jss'; // willupdate

import { STORIES_NAME } from './constants';
import { TooltipShadowNoStyle, defaultStyles } from '../';

// const styles = {...defaultStyles, ...{
//   content: {
//     boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
//   }
// }}

const styles = mergeWith({}, defaultStyles, {
  content: {
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
    fontSize: '0.75rem',
    padding: '0.75rem',
    '& h4': {
      fontWeight: 500,
      fontSize: '18px',
      lineHeight: 1,
      color: 'var(--slate-green)',
      marginBottom: '5px',
    },
    '& p': {
      lineHeight: 1.2,
      color: 'var(--n3)',
      whiteSpace: 'normal',
    },
  },
  searchArrow: {
    height: '0.9375rem',
    '&:before': {
      boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
    },
  },
});

const TooltipShadowCustom = withStyles(styles)(TooltipShadowNoStyle);

storiesOf(STORIES_NAME, module).add(
  'Custom Style',
  () => (
    <main>
      <h4 className="stories-h1">1. content is text</h4>
      <TooltipShadowCustom content="this is tooltip" />
      <h4 className="stories-h1">2. content is React Element</h4>
      <TooltipShadowCustom
        content={(() => (
          <div>
            <h4>will write a test components will all case</h4>
            <p style={{ color: '#3e2863', fontSize: 11 }}>1. Flowers</p>
            <ul style={{ marginLeft: 25 }}>
              <li>hoa hướng dương</li>
              <li>hoa hồng</li>
              <li>hoa anh đào</li>
              <li>hoa cẩm tú cầu</li>
            </ul>
            <p style={{ color: '#3e2863', fontSize: 11 }}>2. Fruits</p>
            <ul style={{ marginLeft: 25 }}>
              <li>cherry</li>
              <li>avocado</li>
              <li>Pomelo</li>
              <li>orange</li>
              <li>lemon</li>
            </ul>
          </div>
        ))()}
      />
    </main>
  ),
  // {
  //   notes: { markdown: StatusBreakdownReadme },
  //   source: StatusBreakdownSource,
  // }
);

export { TooltipShadowCustom };
