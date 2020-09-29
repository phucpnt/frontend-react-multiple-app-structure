import React from "react";
import SummaryPerformances from "../SummaryPerformances_formatData";
// import { SyntaxHighlighter } from "@storybook/components";
// import json from "format-json";
import { ErrorBoundary } from "../error-boundary";

import { formatDataNormal, formatDataGetLodash } from "../formatData";
import {object} from '@storybook/addon-knobs';

const DemoSPef = ({
  title,
  summaryPerformance,
  closeMarketDate,
}) => {
  const dataSP = object('dataSP',summaryPerformance);
  return (
    <main>
      <h1 className="stories-h1">Case ::: {title}</h1>
      <div style={{ marginBottom: 20 }}>
        <div className="stories-box">
          <ErrorBoundary>
            <SummaryPerformances
              closeMarketDate={closeMarketDate}
              summaryPerformance={dataSP}
              formatData={formatDataNormal}
            />
          </ErrorBoundary>
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <div className="stories-box">
          <ErrorBoundary>
            <SummaryPerformances
              closeMarketDate={closeMarketDate}
              summaryPerformance={dataSP}
              formatData={formatDataGetLodash}
            />
          </ErrorBoundary>
        </div>
      </div>

      {/* <pre style={{color: "#999", margin: "20px 0 0 30px"}}>
        <code>
          <SyntaxHighlighter
            language="javascript"
            // showLineNumbers="true"
            format={true}
          >
            {json.diffy(summaryPerformance)}
          </SyntaxHighlighter>
        </code>
      </pre> */}
    </main>
  )
};

export default DemoSPef;
