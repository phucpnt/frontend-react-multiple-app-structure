import React from 'react';
import {
  nf00 as nf0,
  nf22 as nf1,
} from "../core/number-format";
import { isDataAvailable } from "../core/utils";
import get from "lodash/get";

export const formatDataNormal = (summaryPerformance) => [
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

/**
 * use lodash/get
 */
export const formatDataGetLodash = (summaryPerformance) => {
  console.log("ngocoookjkdjf",get(summaryPerformance, "sentiment.valueChange") && nf0.format(get(summaryPerformance, "sentiment.valueChange")));
  return [
    {
      id: "sentiment",
      sectionName: "Company Sentiment Score",
      label: get(summaryPerformance, "sentiment.label"),
      value: get(summaryPerformance, "sentiment.value"),
      valueFmt: nf0.format(get(summaryPerformance, "sentiment.value")),
      valueChange: get(summaryPerformance, "sentiment.valueChange"),
      valueChangeFmt: nf0.format(get(summaryPerformance, "sentiment.valueChange")),
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
      label: get(summaryPerformance, "attentionBuzz.label"),
      value: get(summaryPerformance, "attentionBuzz.value"),
      valueFmt: `${nf0.format(summaryPerformance.attentionBuzz.value * 100)}%`,
      valueChange: get(summaryPerformance, "attentionBuzz.valueChange"),
      valueChangeFmt: nf0.format(summaryPerformance.attentionBuzz.valueChange),

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
      sectionName: get(summaryPerformance, "sentimentVsSector.name")
        ? `${summaryPerformance.sentimentVsSector.name} Sector Sentiment Score`
        : null,
      label: get(summaryPerformance, "sentimentVsSector.label"),
      value: get(summaryPerformance, "sentimentVsSector.value"),
      valueFmt: `${nf1.format(get(summaryPerformance, "sentimentVsSector.value"))}%`,
      // valueChange: -> NO valueChangeFmt
    },
    {
      id: "sentimentVsIndex",
      sectionName: get(summaryPerformance, "sentimentVsIndex.name")
        ? `${summaryPerformance.sentimentVsIndex.name} Index Sentiment Score`
        : null,
      label: get(summaryPerformance, "sentimentVsIndex.label"),
      value: get(summaryPerformance, "sentimentVsIndex.value"),
      valueFmt: `${nf1.format(get(summaryPerformance, "sentimentVsIndex.value"))}%`,
      // valueChange: -> NO valueChangeFmt
    }
  ];
}
