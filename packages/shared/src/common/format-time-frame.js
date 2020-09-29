// FormatTimeframe
import React from "react";
import moment from "moment";

export const timeframeToString = (startDate, endDate) => {
  if (!startDate || !endDate) return '';
  let sDate = moment.utc(startDate).format("DD MMM");
  if (moment.utc(startDate).year() !== moment.utc(endDate).year()) {
    sDate = moment.utc(startDate).format("DD MMM YYYY");
  }
  return `${sDate} - ${moment.utc(endDate).format("DD MMM YYYY")}`;
}

const FormatTimeframe = ({startDate, endDate}) => { // 10 Feb - 12 Mar 2019 (30d)
  return (
    <span>{timeframeToString(startDate, endDate)} <small>({moment.utc(endDate).diff(moment.utc(startDate), "d")+1}d)</small></span>
  )
}

export default FormatTimeframe;
