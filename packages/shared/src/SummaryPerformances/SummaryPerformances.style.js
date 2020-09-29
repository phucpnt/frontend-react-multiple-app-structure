import IconArrowDown from "./images/down.svg";
import IconArrowUp from "./images/up.svg";

const styles = {
  performanceContainer: {
    marginTop: "9px",
    display: "flex",
    flexDirection: "row",
    "& .section": {
      marginRight: "20px",
      flexGrow: 0,
      flexBasis: "100px",
      display: "flex",
      flexDirection: "column",
      marginBottom: 11,
      position: "relative"
    },
    "& .description": {
      fontSize: "11px",
      lineHeight: "1.18",
      color: "var(--n3)",
      flex: 1
    },
    "& .label": {
      textTransform: "uppercase",
      marginTop: "11px",
      width: "90px",
      height: "25px",
      lineHeight: "25px",
      borderRadius: "2px",
      boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.5)",
      border: "solid 1px var(--g4)",
      fontSize: "14px",
      fontWeight: "900",
      letterSpacing: "1.6px",
      color: "var(--g4)",
      textAlign: "center",
      "&.neutral, &.inline": {
        "background-color": "var(--sn2)"
      },
      "&.positive, &.beating": {
        backgroundColor: "var(--sn1)"
      },
      "&.negative, &.lagging": {
        backgroundColor: "var(--sn3)"
      },
      "&.low, &.high, &.extreme, &.average": {
        backgroundColor: "var(--at1)"
      }
    },
    "& .number": {
      marginTop: "5px",
      whiteSpace: "nowrap",
      "&.center": {
        textAlign: "center",
      },
      "& .big": {
        fontSize: "25px",
        fontWeight: "bold",
        color: "#beb3ab",
        marginRight: "5px"
      },
      "& small": {
        fontSize: "10px",
        position: "absolute"
      },
      "& .icon-arrow-up": {
        width: "13px",
        height: "18px",
        display: "inline-block",
        marginLeft: 5,
        background: `url(${IconArrowUp})`,
        backgroundSize: '100% 100%', // for Ms.Edge
      },
      "& .icon-arrow-down": {
        width: "13px",
        height: "18px",
        marginLeft: 5,
        display: "inline-block",
        background: `url(${IconArrowDown})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%', // for Ms.Edge
      }
    }
  },
  asOfDate: {
    marginTop: "18px",
    fontSize: "10px",
    fontWeight: "normal",
    color: "var(--n3)",
  },
  tooltipContainer: {
    width: '200px',
    '& .tt-title': {
      fontSize: '1.2em',
      marginBottom: '.5em',
      '& em': {
        color: 'var(--n3)',
        textDecoration: 'none',
        fontStyle: 'normal',
      }
    },
    '& .tt-content': {
      color: 'var(--n2)',
    }
  },
  textWithTooltip: {
    '&:hover': {
      color: 'var(--a1)',
    }
  }
}

export default styles;
