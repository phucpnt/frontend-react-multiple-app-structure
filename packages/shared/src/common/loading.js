import React from "react";
import PropTypes from "prop-types";
import withStyles from 'react-jss';
import loadingIcon from "./images/sentifi-loading-animated.gif";

const Loading = ({classes, className, style}) => {
  const wrapperClass = [classes.loading];
  if (className) wrapperClass.push(className);

  return (
    <div className={wrapperClass.join(" ")} style={style}>
      <img src={loadingIcon} alt={"loading message..."} />
    </div>
  );
}

Loading.propTypes = {
  classes: PropTypes.object,
  style: PropTypes.shape({}),
};

const styles = {
  loading: {
    verticalAlign: 'top',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& img': {
      maxWidth: 150,
    }
  },
}

export default withStyles(styles)(Loading);
