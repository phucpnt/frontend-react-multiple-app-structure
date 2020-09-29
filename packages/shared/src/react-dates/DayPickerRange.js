import React from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DayPickerRangeController } from 'react-dates';

const START_DATE = 'startDate';
const END_DATE = 'endDate';
const ISO_FORMAT = 'YYYY-MM-DD';
// const ISO_MONTH_FORMAT = 'YYYY-MM';

export default class DayPickerRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedInput: START_DATE,
      startDate: props.startDate,
      endDate: props.endDate,
      isDisablePrev: moment(props.startDate).isSame(props.disablePrev, 'month'),
      isDisableNext: moment(props.endDate).isSame(props.disableNext, 'month'),
    };
  }

  onDatesChange = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate });
  }

  onFocusChange = (focusedInput) => {
    this.setState({
      // Force the focusedInput to always be truthy so that dates are always selectable
      focusedInput: !focusedInput ? START_DATE : focusedInput,
    });
  }

  onPrevNextMonthClick = (crrMonth) => {
    // const args = [...arguments];
    const { disablePrev, disableNext } = this.props;
    const disableNextDp = disableNext.clone();
    this.setState({
      isDisablePrev: moment(crrMonth).isSame(disablePrev, 'month'),
      isDisableNext: moment(crrMonth).isSame(disableNextDp.subtract(1, 'months'), 'month'),
    })
  }

  render() {
    const { disablePrev, disableNext } = this.props;
    const {
      focusedInput,
      startDate,
      endDate,
      isDisablePrev,
      isDisableNext
    } = this.state;

    return (
      <React.Fragment>
        <DayPickerRangeController
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={focusedInput}
          startDate={startDate}
          endDate={endDate}

          numberOfMonths={2}
          minimumNights={0} // allows single day range

          startDateId={START_DATE}
          endDateId={END_DATE}
          hideKeyboardShortcutsPanel={true}
          block={false}
          noBorder={true}
          onPrevMonthClick={this.onPrevNextMonthClick}
          onNextMonthClick={this.onPrevNextMonthClick}
          navPrev={isDisablePrev && <span></span>}
          navNext={isDisableNext && <span></span>}

          isOutsideRange={day => moment(day).isBefore(disablePrev)
            || !moment(day).isBefore(disableNext)}
        />
        <div className="stories-monospace">
          <p>Start Date: {moment(startDate).format(ISO_FORMAT)}</p>
          <p>End Date: &nbsp;&nbsp;{moment(endDate).format(ISO_FORMAT)}</p>
        </div>
      </React.Fragment>
    )
  }
}

DayPickerRange.defaultProps = {
  startDateId: START_DATE,
  endDateId: END_DATE,
  startDate: moment().subtract('days', 7),
  endDate: moment(),
  block: false,
  small: false,
  regular: false,
  disablePrev: moment("2019-01-22"), // .subtract('days', 60),
  disableNext: moment(),
};
