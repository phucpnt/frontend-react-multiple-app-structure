import React, { Component } from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import { DayPickerRangeController } from 'react-dates';
import injectStyle from 'react-jss';

const START_DATE = 'startDate';
const END_DATE = 'endDate';

class MarketDateRangePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedInput: START_DATE,
      startDate: moment(this.props.timeframe.startDate,"YYYY-MM-DD"),
      endDate: moment(this.props.timeframe.endDate,"YYYY-MM-DD"),
    };
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside, false);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, false);
  }

  handleClickOutside = (event) => {
    if (this.dateRangePicker && !this.dateRangePicker.contains(event.target)) {
      this.props.handleCloseTimeframe();
    }
  }

  onDatesChange = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate });
  };

  onFocusChange = (focusedInput) => {
    this.setState({
      focusedInput: !focusedInput ? START_DATE : focusedInput,
    });
  };

  onChange = () => {
    this.props.onFilterChange({timeframe: {
      startDate: moment.utc(this.state.startDate).format("YYYY-MM-DD"),
      endDate: moment.utc(this.state.endDate).format("YYYY-MM-DD"),
    }});
    this.props.handleCloseTimeframe();
  };

  render() {
    const { classes } = this.props;
    return (
      <div
        className={[classes.container, classes.dropdownTimeframe]
          // .concat(this.props.className)
          .join(' ')}
        ref={(node) => { this.dateRangePicker = node; }}
      >
        <div className={classes.dateRangePicker}>
          <DayPickerRangeController
            numberOfMonths={1}
            minimumNights={0}
            startDateId={START_DATE}
            endDateId={END_DATE}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onDatesChange={this.onDatesChange}
            onFocusChange={this.onFocusChange}
            hideKeyboardShortcutsPanel={true}
            focusedInput={this.state.focusedInput}
            block={false}
            noBorder={true}
            isOutsideRange={day => moment(day).isBefore('2015-03-01')
              || !moment(day).isBefore(moment())}
          />

          <div className={classes.btnGr}>
            <button type="submit" onClick={this.onChange}>
              Submit
            </button>
          </div>

        </div>
      </div>
    );
  }
}

MarketDateRangePicker.defaultProps = {
  startDate: null,
  endDate: null,
  onFilterChange: (...args) => {
    console.info('onChange', args);
  },
  handleCloseTimeframe: () => {console.log("Close Timeframe...")}
};

const style = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '230px',
  },
  dropdownTimeframe: {
    position: "absolute",
    zIndex: 100,
    borderRadius: 1,
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.2)",
    backgroundColor: "var(--g4)",
    marginTop: 2,
  },
  btnGr: {
    display: 'flex',
    padding: '0 10px 10px',
    justifyContent: 'flex-end',
  },
  dateRangePicker: {
    position: "relative",
    paddingLeft: 2,
    marginTop: 2,
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
    '& button': {
      borderRadius: '1px',
      padding: '0 9px',
      backgroundColor: 'var(--g4)',
      border: '1px solid var(--n6)',
      fontSize: '12px',
      lineHeight: 2,
      color: 'var(--g2)',
      cursor: 'pointer',
    },
  },
  '@global': {
    '.DayPicker, .DateRangePicker_picker': {
      zIndex: '10',
      top: 'auto !important',
      left: '0 !important',
      zoom: '71%',
      position: 'relative',
    },
    '.DateInput': {
      width: '84px',
    },
    '.DateInput_input': {
      fontSize: '12px',
      color: 'var(--g2)',
      borderBottom: '1px solid transparent',
      padding: '9px 11px 5px',
    },
    '.DateInput_input__focused': {
      borderBottom: '1px solid #215372',
    },
    '.DateRangePickerInput_arrow_svg': {
      width: '16px',
    },
    '.CalendarMonth_caption': {
      fontSize: '11px',
      color: 'var(--p3)',
      textTransform: 'uppercase',
      paddingBottom: '50px',
    },
    '.DayPicker_weekHeader': {
      color: '#beb3ab',
    },
    '.DayPickerNavigation_leftButton__horizontalDefault, DayPickerNavigation_rightButton__horizontalDefault': {
      // border: '0',
      top: '12px',
    },
    '.CalendarDay__default': {
      border: '0',
      color: 'var(--g2)',
      '&.CalendarDay__blocked_out_of_range': {
        background: '#fff',
        color: '#cacccd',
        '&:hover': {
          border: 0,
        }
      },
    },
    '.DayPicker__withBorder': {
      boxShadow: 'none',
    },
    '.CalendarDay__selected_span': {
      background: '#b19faf',
      color: '#fff',
    },
    '.CalendarDay__selected ': {
      background: '#8f6b8b',
      color: '#fff',
    },
    '.CalendarDay__hovered_span,    .CalendarDay__hovered_span:hover': {
      background: '#ad81a8',
      color: '#fff',
      border: '1px double #ad81a8',
    },
    '.CalendarDay__selected_span:active, .CalendarDay__selected_span:hover': {
      background: '#af7ba9',
      color: '#fff',
      border: '1px double #ad81a8',
    },
    '.CalendarDay__selected:active, .CalendarDay__selected:hover': {
      background: '#ad81a8',
      color: '#fff',
      border: '1px double #ad81a8',
    },
  },
};

export default injectStyle(style)(MarketDateRangePicker);
