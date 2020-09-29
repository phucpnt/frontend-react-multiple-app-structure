import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';

const NoData = ({ classes, className, style, children, brWhite, border, defaultHeight, fullWidth }) => {
  const wrapperClass = [classes.nodata];
  if (className) {
    wrapperClass.push(className);
  }
  if (brWhite) {
    wrapperClass.push(classes.brWhite);
  }
  if (border) {
    wrapperClass.push(classes.border);
  }

  if (defaultHeight) {
    wrapperClass.push(classes.defaultHeight);
  }

  if (fullWidth) {
    wrapperClass.push(classes.fullWidth);
  }

  return (
    <div className={wrapperClass.join(' ')} style={style}>
      {children || 'Data not available'}
    </div>
  );
};

NoData.propTypes = {
  classes: PropTypes.object,
  style: PropTypes.shape({}),
};

const styles = {
  nodata: {
    margin: '0 auto',
    color: 'var(--n3)',
    fontSize: 'inherit',
    textAlign: 'center',
  },
  brWhite: {
    backgroundColor: '#FFF',
  },
  border: {
    border: '1px solid #dddddd',
  },
  defaultHeight: {
    height: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWidth: {
    width: '100%',
  },
};

export default withStyles(styles)(NoData);
