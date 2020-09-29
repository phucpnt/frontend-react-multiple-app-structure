import React, { Component } from "react"; // eslint-disable-line
import PropTypes from "prop-types";

import injectStyle from 'react-jss';
import styles from "./Influencers.style";
import FormatTimeframe from "shared/common/format-time-frame";
import { Dropdown } from "./dropdown.next";
import { MessageGroupByDate } from "./message-group-by-date";
import { TagsEvent as Tags } from "./tags";
import DateRangePicker from "./date-range-picker";

const Events = ({
  classes,
  messages,
  total = 0,
  topic = {},
  filter,
  impactGroupList,
  optionChannel,
  optionSortBy,
  onFilterChange = () => {},
  timeframe: timeframeProp,
  onRemoveFilter,
  resetFilter,
  loading,
  openTimeframe,
  handleCloseTimeframe,
  handleToggleTimeframe,
}) => {
  let ddChannel = null;
  let ddSortby = null;
  let ddEventGroup = null;
  let ddImpact = null;
  const allEventInf = {id: null, name: "All Events"};
  const timeframe = filter.timeframe || timeframeProp;

  let selectedImpactGroup = impactGroupList.find(
    e => e.id === parseInt(filter.impactGroupId)
  ) || allEventInf;

  const _impactGroupList = [allEventInf, ...impactGroupList];

  const currentTopImpactList =
    filter.extra && filter.extra.currentTopImpactList && filter.extra.currentTopImpactList.length > 0
      && filter.extra.currentTopImpactList;

  return (
    <div className={classes.influencers}>
      <div className={classes.filter}>
        <Dropdown
          className={classes.dropdownSecond}
          classNameSelect={classes.dropdownFSSelect}
          style={{ width: "174px", display: "inline-block" }}
          classNameContainer={classes.dropdownSecondCt}
          label={selectedImpactGroup.name}
          innerRef={com => {
            ddEventGroup = com;
          }}
        >
          <ul className={classes.dropdownSelectListB}>
            {_impactGroupList.map(e => e.id !== selectedImpactGroup.id ? (
              <li
                key={`igrl__${e.id}`}
                onClick={() => {
                  onFilterChange({ impactGroupId: e.id });
                  ddEventGroup.toggle(false);
                }}
              >
                {e.name}
              </li>
            ) : null)}
          </ul>
        </Dropdown>

        {currentTopImpactList && currentTopImpactList.length && (
          <Dropdown
            className={classes.dropdownSecond}
            classNameSelect={classes.dropdownFSSelect}
            style={{
              width: "130px",
              display: "inline-block",
              marginLeft: "10px"
            }}
            classNameContainer={classes.dropdownSecondCt}
            label={
              (
                currentTopImpactList.find(
                  e => e.id === parseInt(filter.impactIds)
                ) || { name: `Top ${currentTopImpactList.length} Trending` }
              ).name
            }
            innerRef={com => {
              ddImpact = com;
            }}
          >
            <ul className={classes.dropdownSelectListB}>
              {currentTopImpactList.map(e => (
                <li
                  key={e.id}
                  onClick={() => {
                    onFilterChange({ impactIds: e.id });
                    ddImpact.toggle(false);
                  }}
                >
                  {e.name}
                </li>
              ))}
            </ul>
          </Dropdown>
        )}
        <div className={`row-flex-a alignVerticalCenter ${classes.pt10}`}>
          <Dropdown
            className={classes.dropdownSecond}
            classNameSelect={classes.dropdownFSSelect}
            classNameContainer={classes.dropdownSecondCt}
            label={filter.channel.label}
            innerRef={com => {
              ddChannel = com;
            }}
          >
            <ul className={classes.dropdownSelectListB}>
              {Object.keys(optionChannel).map(k => (
                <li
                  key={k}
                  onClick={() => {
                    onFilterChange({ channel: k });
                    ddChannel.toggle(false);
                  }}
                >
                  {optionChannel[k]}
                </li>
              ))}
            </ul>
          </Dropdown>
          <span className={classes.labelSortBy}>Sort by</span>
          <Dropdown
            className={classes.dropdownThird}
            classNameSelect={classes.dropdownFSSelect}
            classNameContainer={classes.dropdownThirdCt}
            label={filter.sortBy.label}
            innerRef={com => {
              ddSortby = com;
            }}
          >
            <ul className={classes.dropdownSelectListB}>
              {Object.keys(optionSortBy).map(k => (
                <li
                  key={k}
                  onClick={() => {
                    onFilterChange({ sortBy: k });
                    ddSortby.toggle(false);
                  }}
                >
                  {optionSortBy[k]}
                </li>
              ))}
            </ul>
          </Dropdown>
        </div>
        <div
          className={`alignVerticalCenter ${classes.toggleTimeframe}`}
          onClick={handleToggleTimeframe}
        >
          <span className={classes.clockIco}>
            <svg width="18px" height="15px" viewBox="0 0 15 15">
              <path
                d="M8.241,0.4825 C4.50838352,0.4825 1.4825,3.50838352 1.4825,7.241 C1.48249996,9.65557952 2.77066278,11.886743 4.86174997,13.0940328 C6.95283716,14.3013225 9.52916284,14.3013225 11.62025,13.0940328 C13.7113372,11.886743 14.9995,9.65557952 14.9995,7.241 C14.9995,3.50838352 11.9736165,0.4825 8.241,0.4825 Z M11.86175,13.512323 C9.62122212,14.8058925 6.86077788,14.8058925 4.62024997,13.512323 C2.37972206,12.2187536 0.999499961,9.82813879 0.9995,7.241 C0.9995,3.24162998 4.24162998,-0.0005 8.241,-0.0005 C12.24037,-0.0005 15.4825,3.24162998 15.4825,7.241 C15.4825,9.82813879 14.1022779,12.2187536 11.86175,13.512323 Z M8.2415,7.13697721 L8.2415,3.893 C8.2415,3.75962323 8.13337677,3.6515 8,3.6515 C7.86662323,3.6515 7.7585,3.75962323 7.7585,3.893 L7.7585,7.242 L7.83531659,7.41863981 L11.4253166,10.7656398 C11.5228721,10.856592 11.6756877,10.8512389 11.7666398,10.7536834 C11.857592,10.6561279 11.8522389,10.5033123 11.7546834,10.4123602 L8.2415,7.13697721 Z"
                id="Ico-Clock"
              />
            </svg>
          </span>
          <FormatTimeframe
            startDate={timeframe.startDate}
            endDate={timeframe.endDate} />
        </div>
        {openTimeframe &&
          <DateRangePicker
            timeframe={timeframe}
            onFilterChange={onFilterChange}
            handleCloseTimeframe={handleCloseTimeframe}
          />
        }
      </div>
      {filter.mentionTopics && (
        <div style={{padding: "0 20px"}}>
          <h4 className={`${classes.subTitle} ${classes.pt10}`}>
            {total} messages related to;
          </h4>
          <Tags
            classes={classes}
            topic={topic}
            filter={filter}
            impactGroupList={impactGroupList}
            onRemoveFilter={onRemoveFilter}
            resetFilter={resetFilter}
          />
        </div>
      )}
      <MessageGroupByDate messages={messages} classes={classes} loading={loading}/>
    </div>
  );
};

Events.propTypes = {
  classes: PropTypes.object
};

export default injectStyle(styles)(Events);
