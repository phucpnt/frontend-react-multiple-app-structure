import React, { useState, useEffect } from 'react';
import 'react-dates/initialize';
import { DayPickerSingleDateController } from 'react-dates';
import moment from 'moment';
import arrowRight from 'market/components/shared/images/arrow-right.svg';
import CloseIcon from 'market/components/common/icons/close';
import Dropdown from '../common/dropdown';
import injectStyle from 'react-jss';
import { getYearsOptionDayPicker, getTimeFrameByPeriodKey } from 'market/lib/util';

function TimeRenderUI(props) {
  let renderTimeRef;

  const {
    currentTimeframe: { period },
    classes,
  } = props;
  const [startDate, setStartDate] = useState(moment.utc(props.currentTimeframe.startDate));
  const [endDate, setEndDate] = useState(moment.utc(props.currentTimeframe.endDate));
  const [showCustomTimeframe, setShowCustomTimeframe] = useState(false);
  const [originTimeFrame, setOriginTimeFrame] = useState({ startDate, endDate });
  let currentItem = props.availTimeframe.find(i => i.key === period);
  const yearOptions = getYearsOptionDayPicker();

  useEffect(() => {
    if (period === 'custom') {
      setShowCustomTimeframe(true);
    } else {
      setShowCustomTimeframe(false);
    }
  }, [period]);

  function changeTimePeriod(key) {
    console.info('key period...', key);
    if (key.period === period) {
      return false;
    }
    let formatDate;
    switch (key.period) {
      case 'today':
        formatDate = moment.utc(moment().toISOString(), 'YYYY-MM-DD');
        break;
      case 'yesterday':
        formatDate = moment.utc(
          moment()
            .subtract(1, 'day')
            .toISOString(),
          'YYYY-MM-DD',
        );
        break;
      case 'last7days':
        formatDate = moment.utc(
          moment()
            .subtract(7, 'day')
            .toISOString(),
          'YYYY-MM-DD',
        );
        break;
      case 'lastmonth':
        formatDate = moment.utc(
          moment()
            .subtract(30 - 1, 'day')
            .toISOString(),
          'YYYY-MM-DD',
        );
        break;
      case 'last3months':
        formatDate = moment.utc(
          moment()
            .subtract(90 - 1, 'day')
            .toISOString(),
          'YYYY-MM-DD',
        );
        break;
      case 'last6months':
        formatDate = moment.utc(
          moment()
            .subtract(180 - 1, 'day')
            .toISOString(),
          'YYYY-MM-DD',
        );
        break;
      case 'last12months':
        formatDate = moment.utc(
          moment()
            .subtract(365 - 1, 'day')
            .toISOString(),
          'YYYY-MM-DD',
        );
        break;
      default:
        formatDate = moment.utc(
          moment()
            .subtract(7, 'day')
            .toISOString(),
          'YYYY-MM-DD',
        );
        break;
    }
    if (key.period === 'custom') {
      setShowCustomTimeframe(true);
      renderTimeRef.toggle(true);

      let curentStartDate = getTimeFrameByPeriodKey(period).startDate;
      setStartDate(moment.utc(curentStartDate));
    } else {
      console.info({key})
      props.changeTimeframe(key);
      setStartDate(formatDate);
      renderTimeRef.toggle(false);
      setShowCustomTimeframe(false);
    }
  }

  // on date change
  function onStartDateChange(startDate) {
    if (moment(endDate).isBefore(startDate)) {
      setEndDate(null);
    }
    setStartDate(startDate);
  }
  function onEndDateChange(endDate) {
    if (moment(startDate).isAfter(endDate)) {
      setStartDate(null);
    }
    setEndDate(endDate);
  }

  // btn submit
  function onCustomRangeSubmit() {
    if (!startDate || !endDate) {
      return false;
    }
    let timeframe = {
      startDate: startDate,
      endDate: endDate,
    };

    props.changeTimeframe({
      period: 'custom',
      frame: timeframe,
    });
    setOriginTimeFrame({ startDate, endDate });

    setShowCustomTimeframe(false);
    renderTimeRef.toggle(false);
  }

  // btn close datepicker
  function onCloseRangeSubmit() {
    setShowCustomTimeframe(false);
    renderTimeRef.toggle(false);
  }

  // convert moment to string
  const timeframeToString = (startDate, endDate) => {
    if (!startDate || !endDate) return '';
    let sDate = moment(startDate).format('DD MMM');
    if (moment(startDate).year() !== moment(endDate).year()) {
      sDate = moment(startDate).format('DD MMM YYYY');
    }
    return `${sDate} - ${moment(endDate).format('DD MMM YYYY')} ?`;
  };

  // get label dropdown
  let label;
  if (period === 'custom') {
    label = timeframeToString(originTimeFrame.startDate, originTimeFrame.endDate);
  } else if (period === 'today') {
    label = currentItem.label + '?';
  } else if (period === 'yesterday') {
    label = currentItem.label + '?';
  } else {
    label = 'the ' + currentItem.label.toLowerCase() + '?';
  }

  // hide datepicker when close hide dropdown
  function handleCloseDropdown() {
    setShowCustomTimeframe(false);
  }

  // show datepicker and set original value
  function handleOpenDropdown() {
    if (period === 'custom') {
      setShowCustomTimeframe(true);

      onStartDateChange(originTimeFrame.startDate);
      onEndDateChange(originTimeFrame.endDate);
    } else {
      onStartDateChange(
        moment.utc(
          moment()
            .subtract(30 - 1, 'day')
            .toISOString(),
          'YYYY-MM-DD',
        ),
      );

      onEndDateChange(moment.utc(moment().toISOString(), 'YYYY-MM-DD'));
    }
  }

  return (
    <React.Fragment>
      <Dropdown
        innerRef={com => {
          renderTimeRef = com;
        }}
        classNameSelect={classes.dropdownSelect}
        classNameDropbox={classes.dropdownCt}
        label={label}
        onHide={handleCloseDropdown}
        onShow={handleOpenDropdown}
      >
        <div className={classes.presetTimeframe}>
          <ul className={showCustomTimeframe ? classes.calendarDisplayed : ''}>
            {props.availTimeframe.map(item => {
              return (
                <li
                  key={item.key}
                  onClick={() => {
                    changeTimePeriod({ period: item.key });
                  }}
                  className={item.key === period ? 'active' : ''}
                >
                  {item.label}
                </li>
              );
            })}
          </ul>
        </div>
        {!!showCustomTimeframe && (
          <div className={classes.dateRangePicker}>
            <div className="row align-items-center">
              <input
                name="dateStart"
                placeholder="Start Date"
                readOnly
                value={startDate ? moment(startDate).format('DD MMM YYYY') : ''}
              />
              <img
                src={arrowRight}
                style={{
                  margin: '0 15px',
                }}
              />
              <input
                name="dateEnd"
                placeholder="End Date"
                readOnly
                value={endDate ? moment(endDate).format('DD MMM YYYY') : ''}
              />
              <button
                type="submit"
                className="btnSubmit"
                onClick={onCustomRangeSubmit}
                disabled={!startDate || !endDate}
              >
                Submit
              </button>
            </div>
            <button type="button" className={classes.btnClose} onClick={onCloseRangeSubmit}>
              <CloseIcon />
            </button>
            <div className="d-flex ">
              <DayPickerSingleDateController
                onDateChange={onStartDateChange}
                focused={true}
                date={startDate}
                numberOfMonths={1}
                hideKeyboardShortcutsPanel={true}
                isOutsideRange={day =>
                  !moment.utc(day, 'YYYY-MM-DD').isAfter(moment.utc('2015-03-01', 'YYYY-MM-DD')) ||
                  moment(moment.utc().format('YYYY-MM-DD')).isBefore(moment(day).format('YYYY-MM-DD'))
                }
                renderMonthElement={({ month, onMonthSelect, onYearSelect }) => (
                  <div className="pickerRangeMonthElement">
                    <div className="item-element">
                      <select
                        value={month.month()}
                        onChange={e => {
                          onMonthSelect(month, e.target.value);
                        }}
                      >
                        {moment.months().map((label, value) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                      <i className="arrow"></i>
                    </div>
                    <div className="item-element">
                      <select
                        value={month.year()}
                        onChange={e => {
                          onYearSelect(month, e.target.value);
                        }}
                      >
                        {yearOptions.map(year => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                      <i className="arrow"></i>
                    </div>
                  </div>
                )}
              />
              <DayPickerSingleDateController
                onDateChange={onEndDateChange}
                focused={true}
                date={endDate}
                numberOfMonths={1}
                hideKeyboardShortcutsPanel={true}
                isOutsideRange={day =>
                  !moment.utc(day, 'YYYY-MM-DD').isAfter(moment.utc('2015-03-01', 'YYYY-MM-DD')) ||
                  moment(moment.utc().format('YYYY-MM-DD')).isBefore(moment(day).format('YYYY-MM-DD'))
                }
                renderMonthElement={({ month, onMonthSelect, onYearSelect }) => (
                  <div className="pickerRangeMonthElement">
                    <div className="item-element">
                      <select
                        value={month.month()}
                        onChange={e => {
                          onMonthSelect(month, e.target.value);
                        }}
                      >
                        {moment.months().map((label, value) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                      <i className="arrow"></i>
                    </div>
                    <div className="item-element">
                      <select
                        value={month.year()}
                        onChange={e => {
                          onYearSelect(month, e.target.value);
                        }}
                      >
                        {yearOptions.map(year => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                      <i className="arrow"></i>
                    </div>
                  </div>
                )}
              />
            </div>
          </div>
        )}
      </Dropdown>
    </React.Fragment>
  );
}

export const TimeRenderSelect = injectStyle(() => ({ ...dropdownStyle, ...timeRenderSelectStyle }))(TimeRenderUI);

const timeRenderSelectStyle = {
  containerTimeSelector: {
    display: 'flex',
    color: 'var(--brownish-grey)',
    fontSize: '28px',
    marginTop: '28px',
    marginBottom: '42px',
  },
  dateRangePicker: {
    position: 'relative',
    paddingLeft: 10,
    paddingTop: 10,
    zIndex: 101,
    backgroundColor: 'var(--g4)',
    '& input': {
      height: '24px',
      border: 'none',
      width: '80px',
      '&:focus': {
        boxShadow: 'inset 0 -1px 0 0 #215372',
      },
    },
    '& .btnSubmit': {
      borderRadius: '1px',
      padding: '0 9px',
      backgroundColor: 'var(--g4)',
      border: '1px solid #ddd',
      fontSize: '12px',
      lineHeight: 2,
      color: 'var(--g2)',
      cursor: 'pointer',
      '-webkit-transition': 'all 0.2s ease',
      transition: 'all 0.2s ease',
      marginLeft: 5,
      '&:hover': {
        border: '1px solid #ccc',
      },
      '&:disabled': {
        cursor: 'not-allowed',
        opacity: 0.5,
      },
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },

  calendarDisplayed: {
    borderRight: '1px solid var(--ice-blue)',
    width: '120px',
  },

  presetTimeframe: {
    width: '100%',
    '& li': {
      listStyleType: 'none',
    },
  },
  btnClose: {
    position: 'absolute',
    top: 5,
    right: 10,
    zIndex: 20,
    cursor: 'pointer',
    border: '0 !important',
    width: 25,
    height: 25,
    background: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    '& svg': {
      width: 12,
      color: '#666',
    },
  },
};

const dropdownStyle = {
  dropdownSelect: {
    fontWeight: 500,
    color: '#635662',
    cursor: 'pointer',
    position: 'relative',
    fontSize: '28px',
    transition: '100ms linear all',
    background: 'transparent',
    border: 'none',
    borderBottom: '2px solid #f47b20',
    height: 'auto',
    borderRadius: 0,
    lineHeight: 'normal',
    paddingLeft: 0,

    '& .arrow': {
      width: '0',
      height: '0',
      borderLeft: '5px solid transparent',
      borderRight: '5px solid transparent',
      borderTop: '5px solid #999',
      position: 'absolute',
      top: 'calc(50% - 2px)',
      right: '-12px',
      transition: '200ms linear all',
    },
    '&.focused': {
      '& .arrow': {
        transform: 'rotate(-180deg)',
      },
    },
  },
  dropdownCt: {
    top: '31px',
    display: 'flex',
    position: 'absolute',
    minWidth: '100%',
    width: 'auto',
    zIndex: 99,
    borderRadius: '2px',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.5)',
    border: 'solid 1px #ccc',
    backgroundColor: 'var(--white)',
    fontSize: '13px',
    marginTop: '-1px',
    color: 'var(--black)',
    '& $presetTimeframe': {
      minWidth: 210,
      '& ul': {
        padding: '5px 0',
        '& li': {
          padding: '0.5rem',
          width: '100%',
          textAlign: 'left',
          cursor: 'pointer',
          '&.active': {
            cursor: 'default',
          },
          '&:last-child': {
            borderBottom: 0,
          },
          '&:hover:not(.active)': {
            background: '#f4f4f4',
            color: 'var(--a1)',
          },
        },
      },
    },
  },
};
