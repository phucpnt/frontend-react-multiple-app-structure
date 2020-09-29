import React from 'react';
import moment from "moment";
import PropTypes from "prop-types";
import withStyles from 'react-jss';
import Tooltip from "./tooltip";
import {
  nf00 as nf0,
  nf22 as nf1,
} from "../core/number-format";
import { isDataAvailable } from "../core/utils";
import IconArrowDown from "./images/down.svg";
import IconArrowUp from "./images/up.svg";

const SummaryPerformances = ({
  classes,
  summaryPerformance,
  closeMarketDate,
}) => {
  const sperf = [
    {
      id: "sentiment",
      sectionName: "Company Sentiment Score",
      label: summaryPerformance.sentiment.label,
      value: summaryPerformance.sentiment.value,
      valueFmt: isDataAvailable(summaryPerformance.sentiment.value)
        ? nf0.format(summaryPerformance.sentiment.value)
        : null,
      valueChange: summaryPerformance.sentiment.valueChange,
      valueChangeFmt: isDataAvailable(summaryPerformance.sentiment.valueChange)
        ? nf0.format(summaryPerformance.sentiment.valueChange)
        : null,
      tooltipContent: {
        title: (
          <span>
            Sentiment Score <em>(15min)</em>
          </span>
        ),
        content:
          "The sentiment score indicates the sentiment for a topic by assigning a score between -100 and +100. The sentiment is considered positive if the score is higher than 40, neutral if it’s between 40 and -40 and negative if the score is lower than -40."
      },
      // showArrow: true, // have valueChange -> will show Arrow
    },
    {
      id: "attentionBuzz",
      sectionName: "Attention Buzz",
      label: summaryPerformance.attentionBuzz.label,
      value: summaryPerformance.attentionBuzz.value,
      valueFmt: isDataAvailable(summaryPerformance.attentionBuzz.value)
        ? `${nf0.format(summaryPerformance.attentionBuzz.value * 100)}%`
        : null,
      valueChange: summaryPerformance.attentionBuzz.valueChange,
      valueChangeFmt: isDataAvailable(summaryPerformance.attentionBuzz.valueChange)
        ? nf0.format(summaryPerformance.attentionBuzz.valueChange)
        : null,
      tooltipContent: {
        title: (
          <span>
            Attention Buzz <em>(15min)</em>
          </span>
        ),
        content:
          "Attention buzz is Attention vs. Moving Average and shows the percentage by which the attention for a topic deviates from the average attention. It ranges from -100% to +infinity and the labels assigned to it are Low (-100%, -20%), Average [-20%, 100%), High [100%, 200%), Extreme [200%, +infinity)"
      },
    },
    {
      id: "sentimentVsSector",
      sectionName: summaryPerformance.sentimentVsSector.name
        ? `${summaryPerformance.sentimentVsSector.name} Sector Sentiment Score`
        : null,
      label: summaryPerformance.sentimentVsSector.label,
      value: summaryPerformance.sentimentVsSector.value,
      valueFmt: isDataAvailable(summaryPerformance.sentimentVsSector.value)
        ? `${nf1.format(summaryPerformance.sentimentVsSector.value)}%`
        : null,
      // valueChange: -> NO valueChangeFmt
    },
    {
      id: "sentimentVsIndex",
      sectionName: summaryPerformance.sentimentVsIndex.name
        ? `${summaryPerformance.sentimentVsIndex.name} Index Sentiment Score`
        : null,
      label: summaryPerformance.sentimentVsIndex.label,
      value: summaryPerformance.sentimentVsIndex.value,
      valueFmt: isDataAvailable(summaryPerformance.sentimentVsIndex.value)
      ? `${nf1.format(summaryPerformance.sentimentVsIndex.value)}%`
      : null,
      // valueChange: -> NO valueChangeFmt
    }
  ];

  return (
    <React.Fragment>
      <div className={classes.performanceContainer}>
      {sperf.map((item, index) => {




        console.log(item);





        return item.sectionName ? (
          <div className="section" key={`${item.id}-${index}`}> {/* item.id maybe undefined */}
            <div className="description">
              {item.tooltipContent && (
                <Tooltip offset={{top: 10, left: 0}}>
                  <span className={classes.textWithTooltip}>{item.sectionName}</span>
                  <div className={classes.tooltipContainer}>
                    <div className="tt-title">{item.tooltipContent.title}</div>
                    <div className="tt-content">{item.tooltipContent.content}</div>
                  </div>
                </Tooltip>
              )}
              {!item.tooltipContent && item.sectionName}
            </div>
            {item.label ? (
              <React.Fragment>
                <div className={["label", item.label.toLowerCase()].join(" ")}>
                  {item.label}
                </div>
                {isDataAvailable(item.value)
                  ? <div className={`number ${item.valueChange ? "" : "center"}`}>
                    <span className="big">
                      {item.valueFmt}
                      {item.valueChange ? <i className={`icon-arrow-${item.valueChange < 0 ? "down" : "up"}`} /> : ""}
                    </span>
                    <br />
                    {item.valueChange
                      ? <small>{item.valueChange < 0 ? "Down" : "Up"} {`${item.valueChangeFmt}pts`}</small>
                      : ""
                    }
                  </div>
                  : <div className="number center"><span className="big">-</span></div>
                }
              </React.Fragment>
            ) : <div className="number center"><span className="big">-</span></div>}
          </div>
        ) : <div className="section" key={`${item.id}-${index}`}>&nbsp;</div>;
      })}
      </div>
      {closeMarketDate && (
        <div className={classes.asOfDate}>
          As of{" "}
          {moment(closeMarketDate)
            .utcOffset(-5 * 60)
            .format("DD MMMM YYYY HH:mm")}{" "}
          EST (Updated every 15 mins)
        </div>
      )}
    </React.Fragment>
  );
};

SummaryPerformances.defaultProps = {
  closeMarketDate: null,
};

SummaryPerformances.propTypes = {
  closeMarketDate: PropTypes.string,
};

const styles = {
  performanceContainer: {
    marginTop: "9px",
    display: "flex",
    flexDirection: "row",
    "& .section": {
      marginRight: "20px",
      flexGrow: 0,
      flexBasis: "100px",
      display: "flex",
      flexDirection: "column",
      marginBottom: 11,
      position: "relative"
    },
    "& .description": {
      fontSize: "11px",
      lineHeight: "1.18",
      color: "var(--n3)",
      flex: 1
    },
    "& .label": {
      textTransform: "uppercase",
      marginTop: "11px",
      width: "90px",
      height: "25px",
      lineHeight: "25px",
      borderRadius: "2px",
      boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.5)",
      border: "solid 1px var(--g4)",
      fontSize: "14px",
      fontWeight: "900",
      letterSpacing: "1.6px",
      color: "var(--g4)",
      textAlign: "center",
      "&.neutral, &.inline": {
        "background-color": "var(--sn2)"
      },
      "&.positive, &.beating": {
        backgroundColor: "var(--sn1)"
      },
      "&.negative, &.lagging": {
        backgroundColor: "var(--sn3)"
      },
      "&.low, &.high, &.extreme, &.average": {
        backgroundColor: "var(--at1)"
      }
    },
    "& .number": {
      marginTop: "5px",
      whiteSpace: "nowrap",
      "&.center": {
        textAlign: "center",
      },
      "& .big": {
        fontSize: "25px",
        fontWeight: "bold",
        color: "#beb3ab",
        marginRight: "5px"
      },
      "& small": {
        fontSize: "10px",
        position: "absolute"
      },
      "& .icon-arrow-up": {
        width: "13px",
        height: "18px",
        display: "inline-block",
        marginLeft: 5,
        background: `url(${IconArrowUp})`,
        backgroundSize: '100% 100%', // for Ms.Edge
      },
      "& .icon-arrow-down": {
        width: "13px",
        height: "18px",
        marginLeft: 5,
        display: "inline-block",
        background: `url(${IconArrowDown})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%', // for Ms.Edge
      }
    }
  },
  asOfDate: {
    marginTop: "18px",
    fontSize: "10px",
    fontWeight: "normal",
    color: "var(--n3)",
  },
  tooltipContainer: {
    width: '200px',
    '& .tt-title': {
      fontSize: '1.2em',
      marginBottom: '.5em',
      '& em': {
        color: 'var(--n3)',
        textDecoration: 'none',
        fontStyle: 'normal',
      }
    },
    '& .tt-content': {
      color: 'var(--n2)',
    }
  },
  textWithTooltip: {
    '&:hover': {
      color: 'var(--a1)',
    }
  }
}

export default withStyles(styles)(SummaryPerformances);
