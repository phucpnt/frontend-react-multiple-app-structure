import { fetchJson } from 'shared/lib/fetch';
import { paths } from '../endpoints';
import produce from 'immer';

const sortByLabeled = {
  'influencer-score-desc': 'Influencer score',
  'oldest-to-newest': 'Oldest to Newest',
  'newest-to-oldest': 'Newest to oldest',
};

const defaultSortBy = 'influencer-score-desc';

const channelLabeled = {
  'all-channels': 'All Channels',
  twitter: 'Tweets',
  blogs: 'Blogs',
  news: 'News',
};

const initState = {
  available: false,
  visible: false,
  loading: true,
  activeTab: 'influencers',
  influencerFilter: {
    sortBy: { label: 'Influencer score', key: 'influencer-score-desc' },
    channel: { label: 'All Channels', key: 'all-channels' },
    size: 20,
    from: 0,
  },
  eventFilter: {
    sortBy: { label: 'Influencer score', key: 'influencer-score-desc' },
    channel: { label: 'All Channels', key: 'all-channels' },
    size: 20,
    from: 0,
  },
  messageByInfluencer: {
    messages: null,
    aggregations: null,
    total: null,
    hasMore: false,
  },
  messageByEvent: {
    messages: null,
    aggregations: null,
    total: null,
    hasMore: false,
  },
  options: {
    sortBy: sortByLabeled,
    channel: channelLabeled,
    currentTopImpactList: {},
  },
  influencerOptions: [],
  eventOptions: [],
  // timeframe
};

function act(name) {
  return `MSG_RIGHT/${name}`;
}

export const actions = {
  toggleAvailable(available) {
    return {
      type: act('TOGGLE_AVAILABLE'),
      payload: { available },
    };
  },
  searchMessageInfluencer({
    timeframe,
    channel,
    sortBy = defaultSortBy,
    mentionTopics,
    filterType = -3,
    influencerCategory,
    size = 20,
    from = 0,
    extraFilters,
    loadMore = false,
  }) {
    return async dispatch => {
      dispatch({ type: act('LOADING'), payload: { loading: true } });

      const queryParams = {
        startDate: timeframe.startDate,
        endDate: timeframe.endDate,
        channel: channel && channel !== 'all-channels' ? [].concat(channel).join(',') : undefined,
        'sort-by': sortBy,
        'mention-topics': [].concat(mentionTopics).join(','),
        'influencer-group-ids': influencerCategory ? [filterType].concat(influencerCategory).join(',') : filterType,
        size,
        from,
      };

      const {
        data: { messages, aggregations, total },
      } = await fetchJson(paths.MESSAGE_SEARCH_INFLUENCERS(), {
        queryParams,
      });

      dispatch({
        type: act('BY_INFLUENCER/FETCH_SUCCESS'),
        payload: {
          messages,
          aggregations,
          total,
          loadMore,
          filter: {
            timeframe,
            channel,
            sortBy,
            mentionTopics,
            influencerFilter: {
              type: filterType,
              category: influencerCategory,
            },
            size,
            from,
            extra: extraFilters,
          },
        },
      });
      dispatch({ type: act('LOADING'), payload: { loading: false } });
    };
  },
  searchMessageEvent({
    timeframe,
    channel,
    sortBy = defaultSortBy,
    mentionTopics,
    impactGroupId,
    impactIds,
    size = 20,
    from = 0,
    extra,
    loadMore = false,
  }) {
    return async dispatch => {
      dispatch({ type: act('LOADING'), payload: { loading: true } });
      if (impactIds && impactIds.length > 0 && impactGroupId) {
        console.warn(
          '[deprecated] parameters `impact-group-id` has been removed due to issue [INSNEW-579]',
          'https://sentifi.atlassian.net/browse/INSNEW-579',
        );
      }

      const queryParams = {
        startDate: timeframe.startDate,
        endDate: timeframe.endDate,
        channel: channel && channel !== 'all-channels' ? [].concat(channel).join(',') : undefined,
        'sort-by': sortBy,
        'mention-topics': [].concat(mentionTopics).join(','),
        'impact-group-id': impactIds && impactIds.length > 0 ? undefined : impactGroupId,
        'impact-ids': impactIds ? [].concat(impactIds).join(',') : undefined,
        size,
        from,
      };

      const {
        data: { messages, aggregations, total },
      } = await fetchJson(paths.MESSAGE_SEARCH_EVENTS(), {
        queryParams,
      });

      dispatch({
        type: act('BY_EVENT/FETCH_SUCCESS'),
        payload: {
          messages,
          aggregations,
          total,
          loadMore,
          filter: {
            timeframe,
            channel,
            sortBy,
            mentionTopics,
            impactGroupId: impactGroupId,
            impactIds: impactIds,
            size,
            from,
            extra,
          },
        },
      });
      dispatch({ type: act('LOADING'), payload: { loading: false } });
    };
  },

  loadMoreMessage: (currentFilter, tab) => dispatch => {
    if (tab === 'events') {
      dispatch(
        actions.searchMessageEvent({
          timeframe: currentFilter.timeframe,
          channel: currentFilter.channel.key,
          sortBy: currentFilter.sortBy.key,
          mentionTopics: currentFilter.mentionTopics,
          impactGroupId: currentFilter.impactGroupId,
          impactIds: currentFilter.impactIds,
          size: currentFilter.size,
          from: currentFilter.from + 20,
          extra: currentFilter.extra,
          loadMore: true,
        }),
      );
    } else {
      dispatch(
        actions.searchMessageInfluencer({
          timeframe: currentFilter.timeframe,
          channel: currentFilter.channel.key,
          sortBy: currentFilter.sortBy.key,
          mentionTopics: currentFilter.mentionTopics,
          filterType: currentFilter.filterType,
          influencerCategory: currentFilter.influencerCategory,
          size: currentFilter.size,
          from: currentFilter.from + 20,
          extra: currentFilter.extra,
          loadMore: true,
        }),
      );
    }
  },
  toggleDisplay(visible) {
    return { type: act('TOGGLE_DISPLAY'), payload: { visible } };
  },
  switchTab(tab) {
    return { type: act('SWITCH_TAB'), payload: { tab } };
  },

  removeFilterInfluencer: (filter, currentFilter, timeframe) => dispatch => {
    console.info('remove filter influencer', {
      filter,
      currentFilter,
      timeframe,
    });
    const nextFilter = produce(Object.assign({}, currentFilter), draft => {
      if (filter.influencerFilterType) {
        draft.filterType = -3;
      }
      draft.influencerCategory = draft.influencerFilter.category;
      if (filter.influencerCategory) {
        draft.influencerCategory = draft.influencerFilter.category.filter(
          i => [].concat(filter.influencerCategory.toString()).indexOf(i) === -1,
        );
      }
      if (filter.mentionTopics) {
        draft.mentionTopics = draft.mentionTopics.filter(id => filter.mentionTopics.indexOf(parseInt(id)) === -1);
      }
    });

    dispatch(
      actions.searchMessageInfluencer({
        timeframe,
        channel: nextFilter.channel.key,
        sortBy: nextFilter.sortBy.key,
        mentionTopics: nextFilter.mentionTopics,
        filterType: nextFilter.filterType,
        influencerCategory: nextFilter.influencerCategory,
        size: nextFilter.size,
        from: 0,
        extra: nextFilter.extra,
      }),
    );
  },
  removeFilterEvent: (filter, currentFilter, timeframe) => dispatch => {
    console.info('remove filter influencer', {
      filter,
      currentFilter,
      timeframe,
    });
    const nextFilter = produce(Object.assign({}, currentFilter), draft => {
      if (filter.impactGroupId) {
        draft.impactGroupId = undefined;
        draft.impactIds = undefined;
      }
      if (filter.impactIds) {
        draft.impactIds = [].concat(draft.impactIds).filter(i => [].concat(filter.impactIds).indexOf(i) === -1);
      }
      if (filter.mentionTopics) {
        draft.mentionTopics = []
          .concat(draft.mentionTopics)
          .filter(i => [].concat(filter.mentionTopics).indexOf(i) === -1);
      }
    });

    dispatch(
      actions.searchMessageEvent({
        timeframe,
        channel: nextFilter.channel.key,
        sortBy: nextFilter.sortBy.key,
        mentionTopics: nextFilter.mentionTopics,
        impactGroupId: nextFilter.impactGroupId,
        impactIds: nextFilter.impactIds,
        size: nextFilter.size,
        from: 0,
        extra: nextFilter.extra,
      }),
    );
  },
  resetFilterInfluencer(topic, timeframe) {
    return dispatch => {
      return dispatch(
        actions.searchMessageInfluencer({
          timeframe,
          mentionTopics: topic,
          sortBy: initState.influencerFilter.sortBy.key,
          size: initState.influencerFilter.size,
        }),
      );
    };
  },
  resetFilterEvent(topic, timeframe) {
    return dispatch => {
      return dispatch(
        actions.searchMessageEvent({
          timeframe,
          mentionTopics: topic,
          sortBy: initState.eventFilter.sortBy.key,
          size: initState.eventFilter.size,
        }),
      );
    };
  },
  getInfluencerFilterOption() {
    return async dispatch => {
      const { data: options } = await fetchJson(paths.OPTION_INFLUENCER_GROUP());
      return dispatch({
        type: act('OPTION_INFLUENCER_GROUP'),
        payload: { options },
      });
    };
  },
  getEventFilterOption() {
    return async dispatch => {
      const { data: options } = await fetchJson(paths.OPTION_EVENT_GROUP());
      return dispatch({
        type: act('OPTION_EVENT_GROUP'),
        payload: { options },
      });
    };
  },
  cleanMessages() {
    return {
      type: act('CLEAN_MESSAGES'),
    };
  },
};

export function reducer(currentState = initState, action) {
  let state = currentState;
  switch (action.type) {
    case act('TOGGLE_DISPLAY'): {
      state = produce(state, draft => {
        draft.visible = action.payload.visible;
      });
      break;
    }
    case act('BY_INFLUENCER/FETCH_SUCCESS'): {
      const { messages, aggregations, total, loadMore, filter } = action.payload;
      state = produce(state, draft => {
        draft.messageByInfluencer.messages = loadMore ? [...draft.messageByInfluencer.messages, ...messages] : messages;
        draft.messageByInfluencer.aggregations = aggregations;
        draft.messageByInfluencer.total = total;
        draft.messageByInfluencer.hasMore = !messages.length
          ? false
          : draft.messageByInfluencer.messages.length < draft.messageByInfluencer.total;
        draft.influencerFilter = {
          ...filter,
          sortBy: { key: filter.sortBy, label: sortByLabeled[filter.sortBy] },
          channel: {
            key: filter.channel || 'all-channels',
            label: channelLabeled[filter.channel || 'all-channels'],
          },
        };
      });
      break;
    }
    case act('BY_EVENT/FETCH_SUCCESS'): {
      const { messages, aggregations, total, loadMore, filter } = action.payload;
      state = produce(state, draft => {
        draft.messageByEvent.messages = loadMore ? [...draft.messageByEvent.messages, ...messages] : messages;
        draft.messageByEvent.aggregations = aggregations;
        draft.messageByEvent.total = total;
        draft.messageByEvent.hasMore = !messages.length
          ? false
          : draft.messageByEvent.messages.length < draft.messageByEvent.total;
        draft.eventFilter = {
          ...filter,
          sortBy: { key: filter.sortBy, label: sortByLabeled[filter.sortBy] },
          channel: {
            key: filter.channel || 'all-channels',
            label: channelLabeled[filter.channel || 'all-channels'],
          },
        };
      });
      break;
    }
    case act('LOADING'): {
      const { loading } = action.payload;
      state = produce(state, draft => {
        draft.loading = loading;
      });
      break;
    }
    case act('SWITCH_TAB'): {
      const { tab } = action.payload;
      state = produce(state, draft => {
        draft.activeTab = tab;
      });
      break;
    }
    case act('OPTION_INFLUENCER_GROUP'): {
      state = produce(state, draft => {
        draft.influencerOptions = action.payload.options;
      });
      break;
    }
    case act('OPTION_EVENT_GROUP'): {
      state = produce(state, draft => {
        draft.eventOptions = action.payload.options;
      });
      break;
    }
    case act('CLEAN_MESSAGES'): {
      state = produce(state, draft => {
        draft.messageByInfluencer = {
          messages: null,
          aggregations: null,
          total: null,
          hasMore: false,
        };
        draft.messageByEvent = {
          messages: null,
          aggregations: null,
          total: null,
          hasMore: false,
        };
      });
      break;
    }
    case act('TOGGLE_AVAILABLE'): {
      state = produce(state, draft => {
        draft.available = action.payload.available;
      });
      break;
    }
    default:
  }
  return state;
}

export const selectors = {
  isAvailable(state){
    return state.available;
  },
  isVisible(state) {
    return state.visible;
  },
  activeTab(state) {
    return state.activeTab;
  },
  getFilter(state) {
    return selectors.getFilterBy(state)(state.activeTab);
  },
  getFilterBy(state) {
    return tab => {
      return tab === 'influencers' ? state.influencerFilter : state.eventFilter;
    };
  },
  getMessages(state) {
    return state.activeTab === 'influencers' ? state.messageByInfluencer : state.messageByEvent;
  },
  getMessageListBy(state) {
    return tab => {
      return tab === 'influencers' ? state.messageByInfluencer : state.messageByEvent;
    };
  },
  getAvailOptions(state) {
    return state.options;
  },
  isLoading(state) {
    return state.loading;
  },
  influencerOptions(state) {
    return state.influencerOptions;
  },
  eventOptions(state) {
    return state.eventOptions;
  },
};
