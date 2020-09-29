import React from 'react';
import { storiesOf } from '@storybook/react';
import ReactEcharts from 'echarts-for-react';
import withStyles from 'react-jss'; // willupdate

import { STORIES_NAME } from './constants';
import { defaultStyles } from '../';
import README from '../README.md';
import TooltipShadownSource from '!!raw-loader!../';

const Chart = ({ classes }) => {
  const tooltipHtml = (params) => {
    return `
<div class=${classes.container}>
  <div class=${classes.content}>This is tooltip or add params here!!!<br></div>
  <span class=${classes.searchArrow}></span>
</div>`;
  }

  return (<ReactEcharts
    option={{
      color: ['#3398DB'],
      tooltip: {
        show: true,
        // trigger: 'axis',
        formatter: params => tooltipHtml(params),
        position: "top",
        textStyle: {
          color: "#333"
        },
        axisPointer: {
          snap: true
        },
        extraCssText: `background:transparent;max-width: 200px;`,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true
        }
      }],
      yAxis: [{
        type: 'value'
      }],
      series: [{
        name: '直接访问',
        type: 'bar',
        barWidth: '60%',
        data: [10, 52, 200, 334, 390, 330, 220]
      }]
    }} />
  )
}

const ChartCustoTooltip = withStyles(defaultStyles)(Chart);

storiesOf(STORIES_NAME, module)
  .add('with echarts', () => <ChartCustoTooltip />,
    {
      notes: { markdown: README },
      source: TooltipShadownSource,
    }
  )
