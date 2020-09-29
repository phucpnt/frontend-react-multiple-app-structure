/**
 * https://www.npmjs.com/package/react-tooltip#reacttooltiphidetarget
 *
 * isCapture
 */
import React from 'react';
import withStyles from 'react-jss';
import ReactTooltip from "react-tooltip";
import {generateTooltipKey} from '../../core/utils';

class DemoTooltip extends React.Component {
  state = {
    content: null,
    hideTemp: false,
  }

  render() {
    const {classes} = this.props;
    const { content, hideTemp } = this.state;
    const tooltipId = `toottip-${generateTooltipKey()}`;
    return (
      <div className={classes.container}>
        <button
          type="button"
          className={classes.btn}
          data-tip
          data-for={tooltipId}
          // data-event="click focus"
        >
          hover here!!!
          <span className={classes.btnMoreAction}>...</span>
        </button>
        <ReactTooltip
          id={tooltipId}
          // event="click"
          // eventOff="click"
          globalEventOff="click"
          place={"bottom"}
          offset={{ left: "0" }}
          type="notype"
          effect="solid"
          className={classes.tooltipContainer}
          border={false}
          delayHide={50}
          afterHide={() => {
            console.log("afterHide");
            this.setState({
              hideTemp: false,
            });
          }}
        >
          <div className={[classes.tooltipContent, hideTemp ? classes.tooltipHideTemp : ""].join(" ")}>
            <ul>
              <li onClick={() => {
                this.setState({
                  content: ">>> ::: ADD",
                  hideTemp: true,
                });
              }}>
                Add  to my company symbols
              </li>

              <li  onClick={() => {
                this.setState({content: ">>> ::: VIEW"})
              }}>View company detail</li>

              <li  onClick={() => {
                this.setState({content: ">>> ::: SEE"})
              }}>See related messages</li>

              <li  onClick={() => {
                this.setState({content: ">>> ::: DELETE"})
              }}>Delete from comparison</li>
            </ul>
          </div>
        </ReactTooltip>

        <div>
          {content}
        </div>
      </div>
    )
  }
}
const styles = {
  container: {
    position: "relative",
    display: 'flex',
  },
  btn: {
    backgroundColor: "transparent",
    cursor: "pointer",
    border: '1px dotted #ccc',
    position: "relative",
    width: 160,
    height: 42,
  },
  btnMoreAction: {
    fontSize: "23px",
    transform: "rotate(90deg)",
    position: "absolute",
    top: 7,
    right: 0,
    color: "var(--n3)",
    "&:hover, &:focus": {
      color: "var(--g1)"
    }
  },
  tooltipHideTemp: {},
  tooltipContainer: {
    zIndex: 99999,
    padding: 0,
    pointerEvents: "all!important",
    boxShadow: 'none',
    border: 0,
    "&.show": {
      opacity: 1,
      marginTop: 2
    },
  },
  tooltipContent: {
    listStyleType: "none",
    padding: "5px 0",
    borderRadius: "1px",
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.5)",
    backgroundColor: "var(--g4)",
    border: "solid 1px #d1d1d1",
    "&$tooltipHideTemp": {
      // transition: "height 100ms ease-in-out",
      height: 0,
      padding: 0,
      opacity: 0,
      overflow: 'hidden',
    },
    "& ul": {
      listStyleType: "none"
    },
    "& li": {
      cursor: "pointer",
      fontSize: 11,
      padding: "8px 10px",
      color: "var(--n1)",
      fontWeight: "normal",
      "&:hover": {
        background: "var(--ice-blue)",
        color: "var(--a1)"
      }
    }
  },
};

export default withStyles(styles)(DemoTooltip);
