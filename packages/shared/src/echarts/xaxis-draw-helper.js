import xAxisPointer from '../images/axis-pointer.svg';
import moment from 'moment';

const maxDateChartNativeDisplay = 60;
const maxDisplayCountMonth = 12;
export function enhanceWithXAxisDesign(options, date) {
  let dateList = date.map(i => moment.utc(i));

  let monthList = dateList
    .reduce((accum, sp) => {
      if (accum.length === 0) {
        return accum.concat(sp);
      }
      const month = moment.utc(sp).month();
      if (month !== moment.utc(accum[accum.length - 1]).month()) {
        return accum.concat(sp);
      }
      return accum;
    }, [])
    .map(i => moment.utc(i));

  let countMonth = monthList.length;
  let countDate = dateList.length;
  if (countMonth > maxDisplayCountMonth) {
    let gap = Math.floor(countMonth / maxDisplayCountMonth);
    monthList = monthList.filter((i, index) => index > 0 && (index - Math.floor(gap / 2)) % gap === 0);
  }

  options.xAxis = {
    type: 'category',
    z: 2,
    boundaryGap: true,
    axisLine: {
      show: false,
      onZero: false,
    },
    axisTick: {
      show: countDate > maxDateChartNativeDisplay ? false : true,
      length: 20,
      lineStyle: {
        color: '#E1DFDF',
        type: 'dash',
      },
    },
    silent: true,
    data: dateList.map(i => i.toISOString()),
    axisLabel: {
      show: countDate > maxDateChartNativeDisplay ? false : true,
      color: '#fff',
      fontSize: 11,
      margin: 3,
      formatter(value, index) {
        return moment
          .utc(value)
          .format('DD')
          .toUpperCase();
      },
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#E1DFDF',
        type: 'solid',
      },
    },
    axisPointer: {
      show: true,
      label: {
        show: false,
      },
      snap: true,
      handle: {
        show: true,
        icon: `image://${xAxisPointer}`,
        size: 12,
        margin: 0,
      },
    },
  };
  options.series = options.series.concat(
    {
      type: 'custom',
      silent: true,
      data: monthList.map(date => [date.toISOString(), null]),
      renderItem(params, api) {
        const start = api.coord([api.value(0), null]);
        return {
          type: 'text',
          left: 100,
          bottom: 200,
          position: [start[0] - 6, params.coordSys.y + params.coordSys.height + 23],
          z: 1000,
          z2: 1000,
          silent: true,
          style: {
            font: 'bold 10px Roboto',
            text: moment
              .utc(monthList[params.dataIndex])
              .format("MMM'YY")
              .toUpperCase(),
            fill: '#beb3ab',
          },
        };
      },
    },
    {
      type: 'custom',
      silent: true,
      data: [[dateList[0].toISOString(), null]],

      renderItem(params, api) {
        return {
          type: 'rect',
          left: 50,
          bottom: 50,
          z: -1,
          shape: {
            x: params.coordSys.x,
            y: params.coordSys.y + params.coordSys.height,
            width: params.coordSys.width,
            height: 18,
          },
          style: {
            fill: '#3F363F',
          },
        };
      },
    },
  );

  if (countDate > maxDateChartNativeDisplay) {
    let gapDate = Math.floor(countDate / 30);
    let xAxisDate = dateList.filter((date, index) => (index - gapDate / 2) % gapDate === 0);
    options.series.push({
      type: 'custom',
      silent: true,
      data: xAxisDate.map(i => [i.toISOString(), null]),
      renderItem(params, api) {
        const start = api.coord([api.value(0), null]);
        return {
          type: 'text',
          left: 100,
          bottom: 200,
          position: [start[0] - 6, params.coordSys.y + params.coordSys.height + 4],
          z: 1000,
          z2: 1000,
          silent: true,
          style: {
            font: '11px Roboto',
            text: moment
              .utc(xAxisDate[params.dataIndex])
              .format('DD')
              .toUpperCase(),
            fill: '#ffffff',
          },
        };
      },
    });
  }

  return options;
}
