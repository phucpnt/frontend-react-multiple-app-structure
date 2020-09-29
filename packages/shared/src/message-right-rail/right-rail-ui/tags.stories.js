import React from 'react';
import { storiesOf } from '@storybook/react';
import { isObjAvailable, getSafe } from "../../lib/util";
import {
  object,
} from '@storybook/addon-knobs';

storiesOf('Company | Utils / verify undefined', module)
  .add("expected case", () => {

    const filter = object(
      'Data',
      {
        channel: {
          key: "all-channels",
          label: "All Channels"
        },
        extra: {
          impacts: [
            {
              id: 2431,
              name: "License Suspended"
            },
            {
              groupId: 1190,
              id: 4041,
              name: "US Elections - Donald Trump",
            }
          ]
        },
        impactIds: [4041],
        mentionTopics: 578,
        size: 20,
        sortBy:{
          key: "newest-to-oldest",
          label: "Newest to oldest"
        }
      }
    );
    console.log(filter);
    const afterCheck1 = getSafe(() => filter.extra.impacts.filter(e => filter.impactIds.indexOf(e.id) > -1), []);
    console.log('1111', afterCheck1);

    const afterCheck = getSafe(() => {
      const impacts = filter.extra.impacts.filter(ip => isObjAvailable(ip));
      const impactIds = filter.impactIds.filter((ipid) => ipid);
      return impacts.filter(item => impactIds.indexOf(item.id) > -1);
    }, []);


    console.log('2222',afterCheck);

    return (
      <div>
        <p>open console pannel to see detail</p>
        {/** FIXME: it way to complex... */}
      </div>
    )
  })