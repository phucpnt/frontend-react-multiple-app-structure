import React from 'react';
import { storiesOf } from '@storybook/react';
import { STORIES_NAME } from './constants';

import TooltipShadow from '../';
import README from '../README.md';
import TooltipShadownSource from '!!raw-loader!../';
import { TooltipShadowCustom } from './customStyle.stories';

storiesOf(STORIES_NAME, module)
  .add('All', () => (
    <main>
      <h4 className="stories-h1">1. content is text</h4>
      <TooltipShadow content="this is tooltip" />
      <h4 className="stories-h1">2. content is React Element</h4>
      <TooltipShadow content={(() => (
        <div>
          <h1 className="title">will write a test components will all case</h1>
          <p style={{color: "#3e2863", fontSize: 11}}>1. Flowers</p>
          <ul style={{marginLeft: 25}}>
            <li>hoa hướng dương</li>
            <li>hoa hồng</li>
            <li>hoa anh đào</li>
            <li>hoa cẩm tú cầu</li>
          </ul>
          <p style={{color: "#3e2863", fontSize: 11}}>2. Fruits</p>
          <ul style={{marginLeft: 25}}>
            <li>cherry</li>
            <li>avocado</li>
            <li>Pomelo</li>
            <li>orange</li>
            <li>lemon</li>
          </ul>
        </div>
      ))()}/>

      <h4 className="stories-h1">3. Custom Style</h4>
      <TooltipShadowCustom content={(() => (
        <div>
          <h1 className="title">will write a test components will all case</h1>
          <p style={{color: "#3e2863", fontSize: 11}}>1. Flowers</p>
          <ul style={{marginLeft: 25}}>
            <li>hoa hướng dương</li>
            <li>hoa hồng</li>
            <li>hoa anh đào</li>
            <li>hoa cẩm tú cầu</li>
          </ul>
          <p style={{color: "#3e2863", fontSize: 11}}>2. Fruits</p>
          <ul style={{marginLeft: 25}}>
            <li>cherry</li>
            <li>avocado</li>
            <li>Pomelo</li>
            <li>orange</li>
            <li>lemon</li>
          </ul>
        </div>
      ))()}/>
    </main>
  ),
  {
    notes: { markdown: README },
    source: TooltipShadownSource,
  }
)
