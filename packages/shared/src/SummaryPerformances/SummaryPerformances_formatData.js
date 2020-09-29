import React from 'react';
import moment from "moment";
import PropTypes from "prop-types";
import withStyles from 'react-jss';
import Tooltip from "./tooltip";
import { isDataAvailable } from "../core/utils";
import styles from "./SummaryPerformances.style";

const SummaryPerformances = ({
  classes,
  summaryPerformance,
  closeMarketDate,
  formatData,
}) => {
  const sperf = formatData(summaryPerformance);
  return (
    <React.Fragment>
      <div className={classes.performanceContainer}>
      {sperf.map((item, index) => {
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

export default withStyles(styles)(SummaryPerformances);
