import React from "react";
import PropTypes from "prop-types";
import injectStyle from "react-jss";
import loadingIcon from "shared/assets/sentifi-loading-animated.gif";

const global = window;

function retryFetching(retry) {
  if (typeof retry === "function") {
    retry();
  } else {
    global[retry]();
  }
}
const Loading = ({ classes, errorFetching = {} }) => (
  <div className={classes.loading}>
    {!errorFetching.isError && <img src={loadingIcon} alt={"loading"} />}
    {errorFetching.isError && (
      <div style={{ clear: "both" }}>
        There are errors when loading data. Please{" "}
        <button
          className={classes.retryBtn}
          onClick={() => retryFetching(errorFetching.retry)}
        >
          click here
        </button>{" "}
        to try again.
      </div>
    )}
  </div>
);

Loading.propTypes = {
  classes: PropTypes.object,
  errorFetching: PropTypes.object
};

const styles = {
  loading: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    background: "rgba(255, 255, 255, 0.8)",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  retryBtn: {
    border: "none",
    color: "var(--a1)",
    cursor: "pointer"
  }
};

export default injectStyle(styles)(Loading);
