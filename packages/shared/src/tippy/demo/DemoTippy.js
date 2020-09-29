/**
 * https://github.com/atomiks/tippy.js-react
 */

import React from 'react';
import Tippy from '@tippy.js/react';
import withStyles from 'react-jss';
import { Tooltip, Popover } from '../TooltipPopover';
import iconClose from "../images/close.svg";

const StringContent = () => (
  <Tippy content="Hello">
    <button>My button</button>
  </Tippy>
)

const JSXContent = () => (
  <Tippy content={<span>Tooltip</span>}>
    <button>My button</button>
  </Tippy>
)

const contentTT = (classes) => (
  <div>
    <span className={classes.smaItem} style={{ marginLeft: "3px" }}>
    SMA
    </span>
    <div className={classes.smaSelectContainer}>
    <span
      style={{
        fontWeight: 500,
        lineHeight: 1.18,
        letterSpacing: "0px",
        color: "var(--g3)"
      }}
    >
      Sentiment Simple Moving Average
    </span>
    <br />
    <span style={{ fontSize: "10px", color: "var(--n3)" }}>Periods</span>
    <br />
    <select
      defaultValue="URE"
      style={{
        borderRadius: "2px",
        border: "1px solid #d8d8d8",
        backgroundColor: "#fff"
      }}
      onChange={() => {console.log("aaa")}}
    >
      <option value="5">5</option>
      <option value="20">20</option>
      <option value="50">50</option>
      <option value="5">5</option>
      <option value="20">20</option>
      <option value="50">50</option>
      <option value="5">5</option>
    </select>
    <button
      style={{ marginLeft: "20px", cursor: "pointer" }}
      onClick={() => {console.log("aaa")}}
    >
      Apply
    </button>
    </div>
  </div>
);

const DemoTooltip = ({classes}) => (
  <div>
    <Popover content={contentTT(classes)}>
      <button>My Popover</button>
    </Popover>

    <br />
    <br /><br />
    <Tippy
      content={contentTT(classes)}
      animateFill={false}
      animation='scale'
      interactive={true}
      interactiveBorder={10}
      theme='light-border'
    >
      <button style={{padding:20}}>My Tippy Tooltip hover</button>
    </Tippy>

    <pre>
      <code>
{`animateFill={false}
animation='scale'
interactive={true}
interactiveBorder={10}
theme='light-border'`}
      </code>
    </pre>
  </div>
);

const styles = {
  container: {
    position: "relative",
    marginLeft: "-8px"
  },
  legendContainer: {
    marginRight: "91px",
    marginBottom: "13px"
  },
  yAxisLabel: {
    position: "absolute",
    marginLeft: "-76px",
    left: "100%",
    top: "13px",
    fontSize: "11px",
    color: "var(--g2)"
  },
  iconRemove: {
    background: `url(${iconClose}) no-repeat`,
    height: "8px",
    width: "9px",
    display: "inline-block",
    backgroundSize: "cover",
    cursor: "pointer"
  },
  smaSelectContainer: {
    fontWeight: "normal",
    width: "165px",
    textAlign: "left",
    "& button": {
      padding: "5px",
      borderRadius: "3px",
      backgroundColor: "var(--g2)",
      color: "var(--g4)",
      border: "1px solid #d1d1d1"
    }
  },
  smaItem: {
    cursor: "pointer",
    "&:hover": {
      color: "var(--a1)"
    }
  }
};

const DemoTooltipWithStyle = withStyles(styles)(DemoTooltip);

const DemoTippy = () => (
  <div>
    <StringContent />
    <JSXContent />
    <br />
    <DemoTooltipWithStyle />
  </div>
)



export default DemoTippy;