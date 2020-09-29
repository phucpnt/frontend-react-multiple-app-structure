import React from 'react';
import injectStyle from 'react-jss';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { bindActionCreators } from 'redux';
import { getScrollbarWidth } from 'shared/lib/util';
import { getFocusTopic, selectors as selectorsMain } from './redux/main';
import { actions, selectors } from './redux/message';

const headerHeight = 126;
const TIME_ANIMATE = 400;
const stickyStyle = {
  sticky: {
    top: headerHeight,
    right: `${getScrollbarWidth()}px`,
    bottom: 0,
    position: "fixed",
    height: `calc(100vh - ${headerHeight}px)`,
    backgroundColor: "#ddd",
    zIndex: 1301
    // "&.stick": {
    //   position: "fixed",
    //   height: "100%"
    // }
  },
};
const stickyStyleAnimate = {
  animeAppear: {
    opacity: 0,
    marginRight: -370,
  },
  animeEnter: {
    opacity: 0.01,
    marginRight: -370,
  },
  animeEnterActive: {
    opacity: 1,
    marginRight: 0,
    transition: `opacity ${TIME_ANIMATE - 200}ms linear, margin-right ${TIME_ANIMATE}ms ease`,
  },
  animeExit: {
    opacity: 1,
    marginRight: 0,
  },
  animeExitActive: {
    opacity: 0.01,
    marginRight: -370,
    transition: `opacity ${TIME_ANIMATE}ms linear, margin-right ${TIME_ANIMATE}ms ease`,
  },
  animeExitDone: {
    opacity: 0,
    marginRight: -370,
    display: 'none',
  },
  animeCollapseEnter: {
    opacity: 0,
  },
  animeCollapseEnterActive: {
    opacity: 1,
    transition: `opacity ${TIME_ANIMATE - 200}ms linear`,
  },
};

const Sticky = injectStyle(stickyStyle)(
  class _Sticky extends React.Component {
    render() {
      const { children, classes, style, stickyClasses } = this.props;
      return (
        <div style={style} className={stickyClasses || classes.sticky}>
          {children}
        </div>
      );
    }
  },
);

const style = {
  bar: {
    width: '30px',
    height: '100%',
    backgroundColor: '#ddd',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
};
const RightRailHidden = injectStyle(style)(function RightRailHidden({ classes, onClick }) {
  return (
    <div className={classes.bar} onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="20" viewBox="0 0 12 20">
        <path fill="#666" fillRule="evenodd" d="M12 0L0 10l12 10z" />
      </svg>
    </div>
  );
});

const retryable = (fun, catchWithRetry) => {
  const nuFun = (...args) => {
    try {
      const result = fun(...args);
      if (result.then) {
        return result.catch(err => {
          catchWithRetry(err, () => nuFun(...args));
        });
      }
      return Promise.resolve(result);
    } catch (err) {
      catchWithRetry(err, () => nuFun(...args));
    }
  };
  return nuFun;
};

export function containerRightRail(RightRail) {
  const ContainerRightRail = injectStyle(stickyStyleAnimate)(
    class _ContainerRightRail extends React.Component {
      constructor(props) {
        super(props);
        this.state = { errorFetching: {}, needUpdateMessages: false };

        this.getMessages = retryable(this.getMessages, (err, retry) => {
          this.setState({
            errorFetching: {
              isError: true,
              retry: () => {
                this.setState({
                  errorFetching: { isError: false, retry: null },
                });
                retry();
              },
            },
          });
        });
      }

      componentDidMount() {
        const { activeTab, isVisible } = this.props;
        if (isVisible) {
          this.switchTab(activeTab);
        }
        this.props.getInfluencerFilterOption();
        this.props.getEventFilterOption();
      }

      componentDidUpdate(prevProps) {
        const {
          timeframe: { startDate: prevStartDate, endDate: prevEndDate  },
        } = prevProps;
        const {
          timeframe: { startDate, endDate },
          isVisible,
          activeTab,
        } = this.props;

        if (prevStartDate !== startDate || prevEndDate !== endDate || prevProps.topic.id !== this.props.topic.id) {
          if (isVisible) {
            this.getMessages(activeTab);
          } else {
            this.setState({
              needUpdateMessages: true,
            });
          }
        }
      }

      getMessages = tab => {
        const { timeframe, topic } = this.props;
        const filter = this.props.filterByTab(tab);

        this.setState({ errorFetching: { isError: false } });

        if (tab === 'events') {
          return this.props.loadEventMessage({
            timeframe,
            channel: filter.channel.key,
            sortBy: filter.sortBy.key || filter.sortBy,
            mentionTopics: topic.id,
            impactGroupIds: filter.impactGroupIds,
            impactIds: filter.impactIds,
            size: filter.size,
            from: filter.from,
          });
        } else {
          return this.props.loadInfluencerMessage({
            timeframe,
            sortBy: filter.sortBy.key || filter.sortBy,
            mentionTopics: [topic.id],
            filterType: filter.influencerFilter ? filter.influencerFilter.type : undefined,
            influencerCategory: filter.influencerFilter ? filter.influencerFilter.category : undefined,
            size: filter.size,
            from: filter.from,
            channel: filter.channel.key || filter.channel,
          });
        }
      };

      onLoadMoreMessage = () => {
        const tab = this.props.activeTab;
        const filter = this.props.filterByTab(tab);
        this.props.loadMoreMessage(filter, tab);
      };

      switchTab = tab => {
        const { needUpdateMessages } = this.state;
        const message = this.props.messageByTab(tab);
        this.props.switchTab(tab);
        if (message.messages === null) {
          return this.getMessages(tab);
        }

        if (needUpdateMessages) {
          this.setState({
            needUpdateMessages: false,
          });
          return this.getMessages(tab);
        }
      };

      onFilterChange = filter => {
        if (this.props.activeTab === 'influencers') {
          this.onFilterInfluencerChange(filter);
        } else if (this.props.activeTab === 'events') {
          this.onFilterEventChange(filter);
        }
      };

      onFilterInfluencerChange = filter => {
        const { filter: currentFilter, topic } = this.props;
        const nuFilter = Object.assign({}, currentFilter, filter);
        const timeframe = nuFilter.timeframe || this.props.timeframe;

        this.props.loadInfluencerMessage({
          timeframe,
          sortBy: nuFilter.sortBy.key || nuFilter.sortBy,
          mentionTopics: [topic.id],
          filterType: nuFilter.influencerFilter.type,
          influencerCategory: nuFilter.influencerFilter.category,
          size: nuFilter.size,
          from: nuFilter.from,
          channel: nuFilter.channel.key || nuFilter.channel,
        });
      };

      onFilterEventChange = filter => {
        const { filter: currentFilter, topic } = this.props;
        const nuFilter = Object.assign({}, currentFilter, filter);
        const timeframe = nuFilter.timeframe || this.props.timeframe;

        const impactIds =
          (filter.impactGroupId &&
            currentFilter.impactGroupId &&
            filter.impactGroupId !== currentFilter.impactGroupId) ||
          !nuFilter.impactIds
            ? []
            : [].concat(nuFilter.impactIds);

        if (!nuFilter.extra || !nuFilter.extra.impacts) {
          nuFilter.extra = { ...nuFilter.extra, impacts: [] };
        }

        if (typeof filter.impactGroupId !== 'undefined' && nuFilter.extra.currentAllEvents) {
          nuFilter.extra.currentTopImpactList =
            filter.impactGroupId === null
              ? nuFilter.extra.currentAllEvents.slice(0, 5).map(value => value.eventInfo)
              : nuFilter.extra.currentAllEvents
                  .filter(value => value.groupingInfo.id === filter.impactGroupId)
                  .slice(0, 5)
                  .map(value => value.eventInfo);
          nuFilter.extra.impacts = nuFilter.extra.impacts = nuFilter.extra.currentTopImpactList;
        }

        if (filter.impactIds) {
          nuFilter.extra.impacts = nuFilter.extra.currentTopImpactList.filter(value => value.id === filter.impactIds);
        }

        const params = {
          timeframe,
          channel: nuFilter.channel.key || nuFilter.channel,
          sortBy: nuFilter.sortBy.key || nuFilter.sortBy,
          mentionTopics: topic.id,
          impactIds,
          size: nuFilter.size,
          from: nuFilter.from,
          extra: nuFilter.extra,
        };

        if (nuFilter.impactGroupId) params.impactGroupId = nuFilter.impactGroupId;

        this.props.loadEventMessage(params);
      };

      toggleVisible(display) {
        this.props.toggleDisplay(display === undefined ? !this.props.isVisible : display);
        if (display === true) {
          this.switchTab(this.props.activeTab);
        }
      }

      render() {
        const {
          message,
          timeframe,
          filter,
          influencerList,
          options,
          topic,
          loading,
          activeTab,
          impactGroupList,
          isVisible,
          onRemoveFilter,
          resetFilter,
          classes,
          style,
          stickyClasses,
        } = this.props;
        const { errorFetching } = this.state;

        const displayStyle = {...style};

        console.info('stickyClasses', stickyClasses);
        return (
          <Sticky style={displayStyle} stickyClasses={stickyClasses}>
            <CSSTransition
              key="animeExpansion"
              in={isVisible === true}
              timeout={TIME_ANIMATE}
              classNames={{
                appear: classes.animeAppear,
                enter: classes.animeEnter,
                enterActive: classes.animeEnterActive,
                exit: classes.animeExit,
                exitActive: classes.animeExitActive,
                exitDone: classes.animeExitDone,
              }}
            >
              <div
                style={{
                  display: isVisible ? 'block' : 'none',
                  height: '100%',
                }}
              >
                <RightRail
                  loading={loading}
                  errorFetching={errorFetching}
                  topic={topic}
                  messages={message.messages}
                  hasMore={message.hasMore}
                  total={message.total}
                  timeframe={timeframe}
                  filter={filter}
                  influencerList={influencerList}
                  onFilterChange={this.onFilterChange}
                  onLoadMoreMessage={this.onLoadMoreMessage}
                  options={options}
                  activeTab={activeTab}
                  switchTab={this.switchTab}
                  impactGroupList={impactGroupList}
                  onClose={this.toggleVisible.bind(this, false)}
                  onRemoveFilter={onRemoveFilter}
                  resetFilter={resetFilter}
                />
              </div>
            </CSSTransition>
            <CSSTransition
              key="animeCollapse"
              in={isVisible === false}
              timeout={TIME_ANIMATE - 200}
              classNames={{
                enter: classes.animeCollapseEnter,
                enterActive: classes.animeCollapseEnterActive,
              }}
              unmountOnExit
            >
              <RightRailHidden onClick={this.toggleVisible.bind(this, true)} />
            </CSSTransition>
          </Sticky>
        );
      }
    },
  );

  const mapStateToProps = state => ({
    loading: selectors.isLoading(state.message),
    message: selectors.getMessages(state.message),
    messageByTab: selectors.getMessageListBy(state.message),
    filter: selectors.getFilter(state.message),
    filterByTab: selectors.getFilterBy(state.message),
    topic: getFocusTopic(state.main),
    timeframe: selectorsMain.selectCurrentTimeFrame(state.main),
    influencerList: selectors.influencerOptions(state.message),
    impactGroupList: selectors.eventOptions(state.message),
    options: selectors.getAvailOptions(state.message),
    activeTab: selectors.activeTab(state.message),
    isVisible: selectors.isVisible(state.message),
    isAvailable: selectors.isAvailable(state.message),
  });

  const mapDispatchToProps = dispatch => ({
    loadInfluencerMessage: bindActionCreators(actions.searchMessageInfluencer, dispatch),
    loadEventMessage: bindActionCreators(actions.searchMessageEvent, dispatch),
    loadMoreMessage: bindActionCreators(actions.loadMoreMessage, dispatch),
    switchTab: bindActionCreators(actions.switchTab, dispatch),
    toggleDisplay: bindActionCreators(actions.toggleDisplay, dispatch),
    removeFilterInfluencer: bindActionCreators(actions.removeFilterInfluencer, dispatch),
    removeFilterEvent: bindActionCreators(actions.removeFilterEvent, dispatch),
    resetFilterEvent: bindActionCreators(actions.resetFilterEvent, dispatch),
    resetFilterInfluencer: bindActionCreators(actions.resetFilterInfluencer, dispatch),
    getInfluencerFilterOption: bindActionCreators(actions.getInfluencerFilterOption, dispatch),
    getEventFilterOption: bindActionCreators(actions.getEventFilterOption, dispatch),
  });

  return connect(mapStateToProps, mapDispatchToProps, (stateProps, dispatchProps, ownProps) => {
    return {
      ...ownProps,
      ...stateProps,
      ...dispatchProps,
      onRemoveFilter(filter) {
        const { filter: currentFilter, timeframe } = stateProps;
        if (stateProps.activeTab === 'influencers') {
          return dispatchProps.removeFilterInfluencer(filter, currentFilter, timeframe);
        } else {
          return dispatchProps.removeFilterEvent(filter, currentFilter, timeframe);
        }
      },
      resetFilter() {
        const { topic, timeframe } = stateProps;
        if (stateProps.activeTab === 'influencers') {
          return dispatchProps.resetFilterInfluencer(topic.id, timeframe);
        } else {
          return dispatchProps.resetFilterEvent(topic.id, timeframe);
        }
      },
    };
  })(ContainerRightRail);
}
