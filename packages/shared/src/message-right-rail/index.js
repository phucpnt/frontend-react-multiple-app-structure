import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { combineReducers } from 'redux';
import { createUseStyles, ThemeProvider } from 'react-jss';
import RightRailUI from './right-rail-ui';
import { containerRightRail as withRightRail } from './container-right-rail';
import { getScrollbarWidth } from 'shared/lib/util';
import moment from 'moment';

import { reducer as rightRailReducer, actions as msgActions, selectors as msgSelectors } from './redux/message';
import mainReducer, { actions } from './redux/main';

import { createReduxStore } from './redux-create-store';

const DEFAULT_STATE = {
  main: {
    focusTopic: {
      id: null,
      name: '-',
      ticker: '-',
      urn: '-',
    },
    startDate: moment.utc(moment().subtract(30, 'day')).format('YYYY-MM-DD'),
    endDate: moment.utc().format('YYYY-MM-DD'),
  },
};

const RightRail = withRightRail(RightRailUI);

const useStyles = createUseStyles({
  sticky: {
    top: 0,
    right: `${getScrollbarWidth()}px`,
    bottom: 0,
    position: 'fixed',
    backgroundColor: '#ddd',
    zIndex: 1301,
  },
});

let singleStore = null;
export function useRightRail() {
  if (singleStore === null) {
    singleStore = createReduxStore(
      combineReducers({
        main: mainReducer,
        message: rightRailReducer,
      }),
    );
  }

  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    return singleStore.subscribe(() => {
      const visible = msgSelectors.isVisible(singleStore.getState().message);
      setVisible(visible);
    });
  }, []);

  return {
    store: singleStore,
    visible,
    toggleAvailable: available => {
      singleStore.dispatch(msgActions.toggleAvailable(available));
    },
    toggle: (visible = true) => {
      singleStore.dispatch(msgActions.toggleDisplay(visible));
    },
    /**
     * 
      filter: {timeframe: timeFrame,
       mentionTopics: topic.id,
       impactIds: [event.eventInfo.id],
       impactGroupId: event.groupingInfo.id,
       extra: {
         impacts: [event.eventInfo],
         currentTopImpactList: currentTopImpactList.map(value => value.eventInfo),
         currentAllEvents: eventList.map(value => ({
           eventInfo: value.eventInfo,
           groupingInfo: value.groupingInfo,
         })),
       },
      }
     */
    viewTopicEvent: (focusTopic, filter) => {
      singleStore.dispatch(actions.changeFocusTopic(focusTopic));
      window.requestAnimationFrame(() => {
        singleStore.dispatch(msgActions.switchTab('events'));
        singleStore.dispatch(msgActions.toggleDisplay(true));
        singleStore.dispatch(msgActions.searchMessageEvent(filter));
      });
    },
    changeTopic: (focusTopic, timeframe) => {
      if (timeframe) {
        singleStore.dispatch(actions.updateTimeframe({ preset: 'custom', timeframe }));
      }
      singleStore.dispatch(actions.changeFocusTopic(focusTopic));
      singleStore.dispatch(msgActions.cleanMessages());
    },
  };
}

export function MessageRightRail({ topicId = null, topicInfo = DEFAULT_STATE.main.focusTopic, stickyClasses }) {
  let { store } = useRightRail();

  return (
    <Provider store={store}>
      <ThemeProvider theme={{}}>
        <MessageRightRailConnector topicId={topicId} topicInfo={topicInfo} stickyClasses={stickyClasses} />
      </ThemeProvider>
    </Provider>
  );
}

function MessageRightRailConnector({ topicId, topicInfo = DEFAULT_STATE.main.focusTopic, stickyClasses }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  React.useEffect(() => {
    let focusTopic = { ...topicInfo, id: topicId };
    dispatch(actions.changeFocusTopic(focusTopic));
    dispatch(msgActions.cleanMessages());
  }, [topicId]);

  return <RightRail stickyClasses={stickyClasses || classes.sticky} topicId={topicId} />;
}
