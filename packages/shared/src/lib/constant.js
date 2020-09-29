import moment from 'moment';

export const FILTER_TYPE_LIST = [
  { value: -1, label: "Top 10 Influencers" },
  { value: -2, label: "Top 10% Influencers" },
  { value: -3, label: "All Influencers" }
];

export const PRESET_TIMEFRAME = {
  '24h': {
    label: 'Yesterday',
    endDate: moment().toISOString(),
    startDate: moment().toISOString(),
  },
  '7d': {
    label: 'last 7 days',
    endDate: moment().toISOString(),
    startDate: moment()
      .subtract(7-1, 'day')
      .toISOString(),
  },
  '30d': {
    label: 'last 30 days',
    endDate: moment().toISOString(),
    startDate: moment()
      .subtract(30-1, 'day')
      .toISOString(),
  },
  '90d': {
    label: 'last 3 months',
    endDate: moment().toISOString(),
    startDate: moment()
      .subtract(90-1, 'day')
      .toISOString(),
  },
  '180d': {
    label: 'last 6 months',
    endDate: moment().toISOString(),
    startDate: moment()
      .subtract(180-1, 'day')
      .toISOString(),
  },
  '365d': {
    label: 'last year',
    endDate: moment().toISOString(),
    startDate: moment()
      .subtract(365-1, 'day')
      .toISOString(),
  },
  'custom': { label: 'Custom' },
}
