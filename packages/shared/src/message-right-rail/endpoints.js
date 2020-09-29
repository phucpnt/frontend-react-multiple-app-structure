export const API_HOST = process.env.NODE_ENV !== "development"
    ? (window.REACT_APP_API_HOST || process.env.REACT_APP_API_HOST)
    : `http://${window.location.host}/api/v1.1/intelligence`

export const paths = {
  TOPIC_SUMMARY_PRICE: id =>
    API_HOST + "/topic/{id}/summary-price".replace("{id}", id),
  TOPIC_SUMMARY_PERFORMANCE: id =>
    API_HOST + "/topic/{id}/summary-performances".replace("{id}", id),
  TOPIC_SUMMARY_INSIGHTS: id =>
    API_HOST + "/topic/{id}/summary-insights".replace("{id}", id),
  TOPIC_STOCK_PRICE: id =>
    API_HOST + "/topic/{id}/stock-price".replace("{id}", id),
  TOPIC_TOP_COMPARISON: id =>
    API_HOST + "/topic/{id}/top-comparison".replace("{id}", id),
  TOPIC_TOP_INFLUENCER: id =>
    API_HOST + "/topic/{id}/top-influencer".replace("{id}", id),
  TOPIC_EARNINGS: id => API_HOST + "/topic/{id}/earnings".replace("{id}", id),
  TOPIC_SEARCH: () => `${API_HOST}/topic-search`,
  PRICE_PERFORMANCE_TOPIC: () => `${API_HOST}/topic/price-performance`,
  SENTIMENT_TOPIC: () => `${API_HOST}/sentiment/topic`,
  ATTENTION_TOPIC: () => `${API_HOST}/attention/topic`,
  SENTIMENT_INFLUENCER: () => `${API_HOST}/sentiment/influencer`,
  SENTIMENT_INFLUENCER_GROUP: () => `${API_HOST}/sentiment/influencer-group`,
  SENTIMENT_TOPIC_BY_EVENT: () => `${API_HOST}/sentiment/event`,
  ATTENTION_TOPIC_BY_EVENT: () => `${API_HOST}/attention/event`,
  INFLUENCER_PERIOD_SENTIMENT: () =>
    `${API_HOST}/period-sentiment/influencer-group`,
  INFLUENCER_PERIOD_ATTENTIONBUZZ: () =>
    `${API_HOST}/period-attention-buzz/influencer-group`,
  INFLUENCER_SEARCH: () =>
    `${API_HOST}/influencer-search`,
  OPTION_INFLUENCER_GROUP: () => `${API_HOST}/option/influencer-group`,
  OPTION_EVENT_GROUP: () => `${API_HOST}/option/event-group`,
  PEER_COMPANY_TOPIC: () => `${API_HOST}/peer-companies/topic`,
  PEER_COMPANY_EVENT: () => `${API_HOST}/peer-companies/event`,
  PERFORMANCE_TOPIC: () => `${API_HOST}/performance`,
  PERFORMANCE_EVENT: () => `${API_HOST}/performance/event`,
  PERIOD_SENTIMENT_TOPIC: () => `${API_HOST}/period-sentiment/topic`,
  PERIOD_SENTIMENT_SUMMARY: () => `${API_HOST}/period-sentiment/summary`,
  PERIOD_ATTENTION_BUZZ_SUMMARY: () =>
    `${API_HOST}/period-attention-buzz/summary`,
  PERIOD_ATTENTION_BUZZ_TOPIC: () => `${API_HOST}/period-attention-buzz/topic`,
  PERIOD_SENTIMENT_EVENT: () => `${API_HOST}/period-sentiment/event`,
  PERIOD_ATTENTION_BUZZ_EVENT: () => `${API_HOST}/period-attention-buzz/event`,
  EVENT_TOP_INFLUENCERS: () => `${API_HOST}/event/top-influencer`,
  MESSAGE_SEARCH_INFLUENCERS: () => `${API_HOST}/message/search/influencers`,
  MESSAGE_SEARCH_EVENTS: () => `${API_HOST}/message/search/events`,
};

/**
 *  @deprecated
 */
export function getReqUrl(path) {
  return path;
}