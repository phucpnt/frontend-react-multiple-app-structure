import React from 'react';
import withStyles from 'react-jss'; // willupdate

const BasicDialogInside = ({ classes, onClose, customKlass, customStyle, children, backdropKlass }) => {
  const dialogStyle = [classes.dialog];
  if (customKlass) dialogStyle.push(customKlass);

  const backdropStyle = [classes.backdrop];
  if (backdropKlass) backdropStyle.push(backdropKlass);

  return children ? (
    <div className={dialogStyle.join(' ')} style={customStyle}>
      <div className={backdropStyle.join(' ')} onClick={onClose} />
      {children}
    </div>
  ) : null;
};

const styles = {
  dialog: {
    position: 'absolute',
    zIndex: 1300,
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    position: 'absolute',
    overflow: 'auto',
    zIndex: -1,
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    WebkitTapHighlightColor: 'transparent',
  },
};

export default withStyles(styles)(BasicDialogInside);
