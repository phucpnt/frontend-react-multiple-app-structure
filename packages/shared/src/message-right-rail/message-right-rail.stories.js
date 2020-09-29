import React from 'react';
import moment from 'moment';
import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';
import { MessageRightRail } from './index.js';

storiesOf('COMPONENTS|Right rail', module).add(
  'default',
  () => {
    require('esg/lib/css/base.css');
    const theDate = moment().utc();
    const topicId = number('topicId', 578);
    return (
      <MessageRightRail
        topicId={topicId}
        topicInfo={{ name: 'Google', ticker: 'GOOGL' }}
        endDate={theDate.format('YYYY-MM-DD')}
        startDate={moment(theDate)
          .subtract(30, 'day')
          .format('YYYY-MM-DD')}
      />
    );
  },
  {
    decorators: [withKnobs],
  },
);

export default { title: 'Components | Right rail' };

export function Demo1073884() {
  return <span>Hello world</span>;
}
