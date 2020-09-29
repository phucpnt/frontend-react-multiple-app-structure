import moment from 'moment';
import update from 'immutability-helper';

import produce from 'immer';
import { PRESET_TIMEFRAME } from 'shared/lib/constant';

const act = actionName => `MAIN/${actionName}`;
const defaultTimeframe = PRESET_TIMEFRAME['30d'];

export const initState = {
  main: {
    focusTopic: {},
    startDate: moment.utc(defaultTimeframe.startDate).format('YYYY-MM-DD'),
    endDate: moment.utc(defaultTimeframe.endDate).format('YYYY-MM-DD'),
    selectedPresetTimeframe: 'lastmonth',
  },
};

export function initLoadContents(topicId) {
  return dispatch => {
    dispatch(getSummary(topicId));
  };
}

export function setTimeRange(timeFrame) {
  return {
    type: 'MAIN/CHANGE_TIME_RANGE',
    payload: {
      timeFrame,
    },
  };
}

export const actions = {
  updateTimeframe({ preset, timeframe }) {
    return {
      type: act('UPDATE_TIME_FRAME'),
      payload: {
        preset,
        timeframe,
      },
    };
  },
  changeFocusTopic(topic) {
    return {
      type: act('TOPIC/UPDATE_FOCUS'),
      payload: { topic },
    };
  },
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case 'MAIN/CHANGE_TIME_RANGE': {
      const { timeFrame } = action.payload;
      state = update(state, {
        main: {
          startDate: { $set: timeFrame.startDate },
          endDate: { $set: timeFrame.endDate },
        },
      });
      break;
    }
    case act('UPDATE_TIME_FRAME'): {
      const { preset, timeframe } = action.payload;
      state = produce(state, draft => {
        draft.main.selectedPresetTimeframe = preset;
        draft.main.startDate = moment.utc(timeframe.startDate).format('YYYY-MM-DD');
        draft.main.endDate = moment.utc(timeframe.endDate).format('YYYY-MM-DD');
      });
      break;
    }
    case act('TOPIC/UPDATE_FOCUS'): {
      const { topic } = action.payload;
      state = produce(state, draft => {
        draft.main.focusTopic = topic;
      });
      break;
    }
    default:
      break;
  }
  return state;
}

export function getFocusTopic(state) {
  return state.main.focusTopic;
}

export const selectors = {
  topicInfo: getFocusTopic,
  selectCurrentTimeFrame(state) {
    const totalDays = moment(state.main.endDate).diff(state.main.startDate, 'd') + 1;
    return {
      startDate: state.main.startDate,
      endDate: state.main.endDate,
      totalDays,
    };
  },
};
