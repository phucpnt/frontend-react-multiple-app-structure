import React, { Component } from "react"; // eslint-disable-line
import PropTypes from "prop-types";
import debounce from "lodash/debounce";
import injectStyle from "react-jss";
import Influencers from "./Influencers";
import {
  nf00 as nf0,
} from "shared/lib/number-format";
import { isArrayAvailable } from "shared/lib/util";
import Events from "./Events";
import Loading from './loading';

const styles = {
  rightRail: {
    zIndex: 999,
    width: "370px",
    height: '100%',
    boxShadow: "-2px 0 4px 0 rgba(0, 0, 0, 0.5)",
    backgroundColor: "#fff",
    overflowY: "auto",
  },
  iconCloseToRight: {
    width: 24,
    height: 24,
    position: "absolute",
    cursor: "pointer",
    zIndex: 10,
    left: 0,
    top: "50%",
    "&:before": {
      border: "solid transparent",
      content: '" "',
      height: "0",
      width: "0",
      pointerEvents: "none",
      borderColor: "transparent",
      borderLeftColor: "var(--n2)",
      borderWidth: "12px",
      marginTop: "-12px",
      position: "absolute",
      left: 0,
      top: 0,
    }
  },
  loading: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    overflow: "hidden",
    width: "370px",
    background: "rgba(255, 255, 255, 0.8)",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  tabs: {
    padding: '20px 20px 0 20px',
    backgroundColor: '#f2f2f2',
  },
  tab: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#bbb",
    letterSpacing: "0.9px",
    background: "transparent",
    border: 0,
    borderBottom: "4px solid transparent",
    padding: "5px 0",
    cursor: "pointer",
    "&.active": {
      color: "var(--n1)",
      borderBottomColor: "var(--n1)",
      cursor: "auto"
    },
    "&:nth-child(2)": {
      marginLeft: 45
    }
  },
  tabcontent: {
    paddingTop: 20
  },
  btnClose: {
    position: "absolute",
    cursor: 'pointer',
    top: 26,
    right: 22,
    border: 0,
    width: 12,
    height: 12,
    background: "transparent",
    zIndex: 999,
    "& svg": {
      display: "block"
    }
  }
};

class RightRail extends React.Component {
  state = {
    openTimeframe: false,
  };

  componentDidMount() {
    this.scrollElm.addEventListener("scroll",
      debounce(() => {
        this.infiniteLoad()
      }, 300)
    );
  }

  componentWillUnmount() {
    this.scrollElm.removeEventListener("scroll", this.infiniteLoad);
  }

  infiniteLoad = () => {
    const { loading, hasMore } = this.props;

    if (loading || !hasMore) return;

    if(this.scrollElm.scrollTop === (this.scrollElm.scrollHeight - this.scrollElm.offsetHeight)) {
      this.props.onLoadMoreMessage && this.props.onLoadMoreMessage();
    }
  }

  handleChangeTab = tab => {
    this.setState({openTimeframe: false});
    this.props.switchTab(tab);
  };

  handleToggleTimeframe = () => {
    this.setState(state => ({
      openTimeframe: !state.openTimeframe
    }));
  };

  handleCloseTimeframe = () => {
    this.setState({openTimeframe: false});
  };

  render() {
    const {
      classes,
      tabs,
      messages,
      filter,
      influencerList,
      timeframe,
      onFilterChange,
      options,
      topic,
      total,
      loading,
      errorFetching,
      activeTab,
      impactGroupList,
      onClose,
      onRemoveFilter,
      resetFilter,
    } = this.props;
    const { openTimeframe } = this.state;

    const TabContent = (tabs.find(t => t.key === activeTab) || {}).tabContent;

    return (
      <div
      className={[classes.rightRail, "scroll-vertical"].join(" ")}
      ref={(DOM) => {
        this.scrollElm = DOM;
      }}
      >
        {loading && (
          <Loading errorFetching={errorFetching} />
        )}
        <div className={classes.iconCloseToRight} onClick={onClose}/>
        <button type="button" className={classes.btnClose} onClick={onClose}>
          <svg
            width="12px"
            height="12px"
            viewBox="0 0 12 12"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.61904248,6 L12,11.3809575 L11.3809575,12 L6,6.61904248 L0.61904248,12 L0,11.3809575 L5.38095752,6 L0,0.61904248 L0.61904248,0 L6,5.38095752 L11.3809575,0 L12,0.61904248 L6.61904248,6 Z"
              fill="#333"
              id="Ico-Close"
            />
          </svg>
        </button>
        <div className={classes.tabs}>
          <div style={{borderBottom: '1px solid #bbb'}}>
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={`${classes.tab} ${
                  activeTab === tab.key ? "active" : ""
                }`}
                onClick={() => {
                  this.handleChangeTab(tab.key);
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className={classes.tabContent}>
          <TabContent
            topic={topic}
            total={total}
            messages={
              messages
                ? messages.map(m => ({
                    ...m,
                    influencerScore: nf0.format(m.influencerScore)
                  }))
                : []
            }
            filter={filter}
            influencerList={influencerList}
            timeframe={timeframe}
            onFilterChange={onFilterChange}
            optionChannel={options.channel}
            optionSortBy={options.sortBy}
            impactGroupList={impactGroupList}
            onRemoveFilter={onRemoveFilter}
            resetFilter={resetFilter}
            loading={loading}
            openTimeframe={openTimeframe}
            handleCloseTimeframe={this.handleCloseTimeframe}
            handleToggleTimeframe={this.handleToggleTimeframe}
          />
        </div>
        {loading && isArrayAvailable(messages) && (
          <div style={{ position: "relative", height: 170 }}><Loading /></div>
        )}
      </div>
    );
  }
}

RightRail.defaultProps = {
  tabs: [
    {
      key: "influencers",
      label: "INFLUENCERS",
      tabContent: Influencers
    },
    {
      key: "events",
      label: "EVENTS",
      tabContent: Events
    }
  ],
  messages: [],
  total: 0,
  aggregations: {},
  filter: {
    channel: { label: "All channels" },
    sortBy: { label: "Newest to Oldest" }
  },
  influencerList: [],
  timeframe: {}
};

RightRail.propTypes = {
  classes: PropTypes.object,
  tabs: PropTypes.array
};

export default injectStyle(styles)(RightRail);
