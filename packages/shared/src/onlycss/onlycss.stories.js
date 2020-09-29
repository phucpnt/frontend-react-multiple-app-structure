import React from 'react';
import { storiesOf } from '@storybook/react';

import CustomScrollbar from './CustomScrollbar';
import CheckboxRadio from './CheckboxRadio';
// import BaseButtonReadme from './BaseButton.md';
import CheckboxRadioSource from '!!raw-loader!./checkbox_radio.css';
import CustomScrollbarSource from '!!raw-loader!./custom-scrollbar.css';

storiesOf('Only CSS|only css', module)
  .add('Checkbox & Radio', () => <CheckboxRadio />,
    {
      notes: '😀 😎 👍 💯',
      source: CheckboxRadioSource,
    }
  )
  .add('Custom Scrollbar', () => <CustomScrollbar />,
    {
      notes: '😀 😎 👍 💯',
      source: CustomScrollbarSource,
    }
  );
