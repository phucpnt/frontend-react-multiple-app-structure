// source: https://docs.google.com/spreadsheets/d/1UaVub6Ip5LYGJYrdkD5zhnkC2pV8LTPNFCqdZtwXxGA/edit#gid=0
// export as the CSV then use online to to conver to json object

export default [
  {
    "Term": "Attention (mentions)",
    "Definition": "Attention is the number of publications (news articles, blog articles and tweets) by influencers that mention a topic over a defined time period."
  },
  {
    "Term": "Attention Change",
    "Definition": "Attention change is the difference in attention between two different points in time or periods of time."
  },
  {
    "Term": "Attention Buzz",
    "Definition": "This is effectively Attention vs. Moving Average and shows the percentage by which the attention for a topic deviates from the average attention. It ranges from -100% to +infinity and the labels assigned to it are Low (-100%, -20%), Average [-20%, 100%), High [100%, 200%), Extreme [200%, +infinity)."
  },
  {
    "Term": "Event",
    "Definition": "An event is an occurrence (e.g. M&A or Financial Results) discussed in publications that can have an impact on the valuation of an asset or importance on a topic."
  },
  {
    "Term": "Influencer",
    "Definition": "Influencers are the qualified and ranked sources (persons or organisations) of publications that can have an impact on a topic."
  },
  {
    "Term": "Influencer Group",
    "Definition": "The influencer group represents the category which an influencer belongs to (e.g. Brokers, Journalists or Activists)."
  },
  {
    "Term": "Influencer Score",
    "Definition": "The influencer score measures the level of relevance an influencer has when mentioning a topic on a range between 0 and 100. Each influencer has a unique influencer score, depending on the topic."
  },
  {
    "Term": "Pre earnings sentiment",
    "Definition": "The pre-earnings sentiment measures the crowd sentiment expressed about a company's earnings before the announcement."
  },
  {
    "Term": "Post earnings sentiment",
    "Definition": "The post-earnings sentiment measures the crowd sentiment expressed about a company's earnings after the announcement."
  },
  {
    "Term": "Publications",
    "Definition": "Publications are news articles, blogs articles or tweets published by influencers."
  },
  {
    "Term": "Sentiment",
    "Definition": "The sentiment is the view or opinion that is expressed in a news article, blog article or tweet and can be positive, neutral or negative."
  },
  {
    "Term": "Sentiment Change",
    "Definition": "The sentiment change is calculated between the sentiment for two different points in time or periods of time."
  },
  {
    "Term": "Sentiment Simple Moving Average",
    "Definition": "The sentiment moving average is the simple moving average sentiment for a topic for pre-defined date ranges."
  },
  {
    "Term": "Sentiment Score",
    "Definition": "The sentiment score indicates the sentiment for a topic by assigning a score between -100 and +100. The sentiment is considered positive if the score is higher than 33, neutral if it’s between 33 and -33 and negative if the score is lower than -33."
  },
  {
    "Term": "Theme",
    "Definition": "A theme is a subject influencers discuss frequently and over a longer time period. In contrast to events (e.g. M&A) that are discussed over the course of days, themes are discussed over months or years (e.g. clean energy)."
  },
  {
    "Term": "Topic",
    "Definition": "Topics are the objects of analysis in financial markets. Sentifi analyses them on an individual level (e.g. companies, currencies, commodities) and on an aggregate level (e.g. sectors, industries, countries, regions, and indices)."
  },
  {
    "Term": "Source",
    "Definition": "Source is the publisher of a text, i.e. the person or organisation who writes news articles, blog articles or tweets. If the publisher passes the profile qualification process, it becomes an influencer. If not, it becomes a disqualified profile."
  },
  {
    "Term": "Price Performance",
    "Definition": "The percentage-change of EOD prices for an asset between two different points in time."
  },
  {
    "Term": "Price Moving Average",
    "Definition": "The simple moving average for EOD prices."
  },
  {
    "Term": "Estimated EPS",
    "Definition": "Earnings per share estimated by analysts before earnings were announced. Refers to a past period for which earnings have now been reported. Data is provided by Factset."
  },
  {
    "Term": "Consensus EPS Forecast (or Forecasted EPS)",
    "Definition": "Combined estimates of analysts before earnings are announced. Refers to the next upcoming reporting period. Data is provided by Factset."
  },
  {
    "Term": "Actual EPS",
    "Definition": "Earnings per share reported by the company on the publication date. Refers to a past period for which earnings have now been reported. Data is provided by Factset."
  },
  {
    "Term": "Earnings Surprise",
    "Definition": "An earnings surprise occurs when a company's reported quarterly or annual profits are below or above analysts' expectations."
  },
  {
    "Term": "ESG Score",
    "Definition": "A proprietary score measuring the sentiments in publications related to Environmental, Social and Governance (ESG)  issues related to an asset, industry, sector, country or region."
  },
  {
    "Term": "Portfolio Structure",
    "Definition": "Portfolio is a combination of stocks and cash investments. Investment in each asset is defined and updated by the user. When the number of shares is unknown, equal weighting is assumed. SENTIFI proprietary analytics are calculated at the portfolio level, at the asset level and at the level of aggregation selected by the user (sector, country, etc)."
  },
  {
    "Term": "Asset Allocation shifts",
    "Definition": "Asset allocation shifts are the active decisions by a portfolio manager to increase or decrease the overall portfolio share of a particular asset at the expense of another. SENTIFI calculates shifts in %, basing its calculation on changes in fund holdings by number of shares and by % in relation to an asset/ sector/ industry/ country/ market cap grouping. Raw data provided by Factset at a full calendar month basis. Measured in %."
  },
  {
    "Term": "Exposure",
    "Definition": "Proportion of the total portfolio market value allocated to an investment, measured in %."
  },
  {
    "Term": "Sector/ Industry",
    "Definition": "The Morningstar investment classification by sector (11) / The Morningstar investment classification by industry (145)."
  },
  {
    "Term": "Country/ Region",
    "Definition": "The SENTIFI investment classification by country (266) / The SENTIFI investment classification by region (12)."
  },
  {
    "Term": "Correlation",
    "Definition": "Correlation is a measure of how close two variables are to having a linear relationship with each other. The possible pairs to examine are: sentiment of a topic against price of stock, sentiment of a topic against sentiment of a topic other than stock"
  },
  {
    "Term": "Currencies",
    "Definition": "The currencies in SENTIFI database covered for analytics (over than 60)."
  },
  {
    "Term": "Commodities",
    "Definition": "The commodities in SENTIFI database covered for analytics (over than 1000, including FX, crypto and physical)."
  },
  {
    "Term": "Custom Index",
    "Definition": "Custom index is a tailor made aggregation of parameters to proxy a custom investment strategy and track sentiment score and attention analytics."
  }
]