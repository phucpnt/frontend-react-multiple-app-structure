import React from "react";
import ReactTooltip from "react-tooltip";
import injectStyle from "react-jss";
import { generateTooltipKey } from '../lib/util';

function TooltipUI({
  className,
  classNameTooltip,
  classes,
  children,
  position = "top",
  triggerOn,
  triggerOff,
  globalEventOff,
  disable = false,
  effect = "solid",
  offset = { top: 0, left: 0 },
  delayHide = 100,
}) {
  const [item, tooltipItem] = children;
  const tooltipId = `toottip-${generateTooltipKey()}`;
  const customStyleTooltip = [classes.tooltipContainerOutside];
  if (classNameTooltip) customStyleTooltip.push(classNameTooltip);

  return (
    <div
      className={[classes.container, className].join(" ")}
      data-tip
      data-for={tooltipId}
      data-event={triggerOn}
      data-event-off={triggerOff}
    >
      {item}
      <ReactTooltip
        id={tooltipId}
        place={position}
        type="light"
        border={false}
        effect={effect}
        className={customStyleTooltip.join(" ")}
        globalEventOff={globalEventOff}
        offset={offset}
        delayHide={delayHide}
        disable={disable}
      >
        <div className={[classes.tooltipContainer, position].join(" ")}>
          <div className={classes.dropdownCt}>{tooltipItem}</div>
        </div>
      </ReactTooltip>
    </div>
  );
}

const style = () => ({
  container: {
    display: "inline-block!important"
  },
  // tooltipContainer: ({ position }) => ({
  //   zIndex: 99999,
  //   padding: 0,
  //   pointerEvents: 'all',
  //   boxShadow: position === 'bottom' ? '0 -2px 4px 0 rgba(0, 0, 0, 0.5)' : '0 2px 4px 0 rgba(0, 0, 0, 0.5)',
  //   '&.show': {
  //     opacity: '1 !important',
  //     marginTop: 2,
  //   },
  // }),
  tooltipContainerOutside: {
    zIndex: 99999,
    border: 'none',
    pointerEvents: "all !important",
    background: 'transparent !important',
    padding: 0,
    opacity: "1 !important",
  },
  tooltipContainer: {
    "&.top": {
      boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.3)"
    },
    "&.bottom": {
      boxShadow: "0 -2px 4px 0 rgba(0, 0, 0, 0.3)"
    },
    "&.show": {
      opacity: "1 !important",
      marginTop: 2
    }
  },
  dropdownCt: {
    borderRadius: 2,
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
    backgroundColor: "var(--g4)",
    color: "var(--n1)",
    fontSize: 10,
    padding: "10px",
    display: "block"
  },
  dropdownSearchArrow: {
    height: "10px",
    position: "relative",
    overflow: "hidden",
    display: "block",
    top: 0,
    "&:before": {
      content: '""',
      position: "absolute",
      width: "20px",
      height: "20px",
      background: "#fff",
      transform: "rotate(45deg)",
      bottom: "8px",
      left: "50%",
      marginLeft: -10,
      boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.1)"
    }
  },
  "@global": {
    ".__react_component_tooltip.type-light.border": {
      border: "1px solid #d1d1d1",

      "&.place-top:before": {
        borderTop: "8px solid #d1d1d1"
      },
      "&.place-bottom:before": {
        borderBottom: "8px solid #d1d1d1"
      }
    },
    '.__react_component_tooltip.show': {
      display: 'block',
    },
    '.__react_component_tooltip': {
      display: 'none',
    }
  }
});

export const Tooltip = injectStyle(style)(TooltipUI);
export default Tooltip;
