import React from 'react';
import { storiesOf } from '@storybook/react';
import { STORIES_NAME } from './constants';

import DemoSPef from "./demo";

storiesOf(STORIES_NAME, module)
  .add('GOOGL', () => (
    <DemoSPef
      title="GOOGL"
      closeMarketDate="2019-03-20T21:00:00Z"
      summaryPerformance={{"sentiment":{"label":"neutral","value":-0.1516300227445034,"valueChange":-19.20295195120484},"attentionBuzz":{"label":"Average","value":0.008148356279853886,"valueChange":-28.719124370992873},"sentimentVsSector":{"label":"neutral","value":13.285660519382764,"name":"Technology"},"sentimentVsIndex":{"label":"neutral","value":1.8454885911740861,"name":"S&P 500"},"updateTime":"2019-03-25T07:59:24Z"}}
    />
    ),
  )
  .add('Tata Consultancy Services Ltd', () => (
    <DemoSPef
      title="Tata Consultancy Services Ltd"
      summaryPerformance={{"sentiment":{"label":"neutral","value":9.375},"attentionBuzz":{"label":"Average","value":0.11946902654867254,"valueChange":-0.5168946098149638},"sentimentVsSector":{"label":"neutral","value":14.05188528701044,"name":"Technology"},"sentimentVsIndex":{"label":"neutral","value":2.973074046372476,"name":"S&P 500"},"updateTime":"2019-03-25T09:07:01Z"}}
    />
    )
  )
  .add('Twitter Inc', () => (
    <DemoSPef
      title="Twitter Inc"
      summaryPerformance={{"sentiment":{"label":"neutral","value":-7.942583732057416,"valueChange":5.494728805435086},"attentionBuzz":{"label":"Low","value":-0.34384858044164035,"valueChange":-22.980212216805278},"sentimentVsSector":{"label":"neutral","value":14.232193229901268,"name":"Technology"},"sentimentVsIndex":{"label":"neutral","value":-0.6380399413003254,"name":"STOXX® North America 600"},"updateTime":"2019-03-25T09:12:20Z"}}
    />
    )
  )
  .add('Facebook Inc', () => (
    <DemoSPef
      title="Facebook Inc"
      summaryPerformance={{"sentiment":{"label":"negative","value":-34.0377358490566,"valueChange":-7.158464778441566},"attentionBuzz":{"label":"Low","value":-0.3927284638060924,"valueChange":-28.93818300926064},"sentimentVsSector":{"label":"neutral","value":14.225922988809586,"name":"Technology"},"sentimentVsIndex":{"label":"neutral","value":3.215363107939077,"name":"S&P 500"},"updateTime":"2019-03-25T09:14:58Z"}}
    />
    )
  )
  .add('Ur-Energy Inc', () => (
    <DemoSPef
      title={`Ur-Energy Inc -- sentiment":{}`}
      summaryPerformance={{"sentiment":{},"attentionBuzz":{"label":"Average","value":0.0,"valueChange":0.0},"sentimentVsSector":{"label":"neutral","value":-0.8875168821146054,"name":"Basic Materials"},"sentimentVsIndex":{"label":"neutral","value":-9.561128526645767,"name":"S&P/TSX"},"updateTime":"2019-03-25T09:16:08Z"}}
    />
    )
  )
  .add('CNBI', () => (
    <DemoSPef
      title="CNBI"
      summaryPerformance={{"sentiment":{},"attentionBuzz":{"label":"Average","value":0.0,"valueChange":0.0},"sentimentVsSector":{"label":"neutral","value":-11.641374173726842,"name":"Consumer Defensive"},"sentimentVsIndex":{},"updateTime":"2019-03-25T09:18:42Z"}}
    />
    )
  )
  .add('EDIG', () => (
    <DemoSPef
      title="EDIG"
      summaryPerformance={{"sentiment":{},"attentionBuzz":{"label":"Average","value":0.0,"valueChange":0.0},"sentimentVsSector":{"label":"neutral","value":14.228528221322778,"name":"Technology"},"sentimentVsIndex":{},"updateTime":"2019-03-25T09:19:36Z"}}
    />
    )
  )

  .add('all empty 🤖 🤖 🤖 ', () => (
    <DemoSPef
      title="EDIG"
      summaryPerformance={{"sentiment":{},"attentionBuzz":{},"sentimentVsSector":{},"sentimentVsIndex":{},"updateTime":"2019-03-25T09:19:36Z"}}
    />
    )
  )

  .add('🐛🐛🐛 bugs', () => (
    <DemoSPef
      title="EDIG"
      summaryPerformance={{"sentiment":null,"attentionBuzz":{},"sentimentVsSector":{},"sentimentVsIndex":{},"updateTime":"2019-03-25T09:19:36Z"}}
    />
    )
  )

