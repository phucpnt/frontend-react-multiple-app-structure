import React from 'react';
import withStyles from 'react-jss'; // willupdate

const DialogContent = ({ classes, customStyle, customKlass, onClose, mainContent, customDialogCt }) => {
  const dialogContentStyle = [classes.dialogContent];
  if (customKlass) dialogContentStyle.push(customKlass);

  const dialogCtStyle = [classes.dialogCt];
  if (customDialogCt) dialogCtStyle.push(customDialogCt);

  return (
    <div className={dialogContentStyle.join(' ')} style={customStyle}>
      <div className={dialogCtStyle.join(' ')}>{mainContent}</div>
      <button type="button" className={classes.btnClose} onClick={onClose}>
        <svg width="10px" height="8px" viewBox="0 0 10 8" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <path d="M5,4 L9,0 L5,4 L9,8 L5,4 Z M5,4 L1,8 L5,4 L1,0 L5,4 Z" stroke="#BEB3AB"></path>
        </svg>
      </button>
    </div>
  );
};

const styles = {
  dialogContent: {
    position: 'relative',
    display: 'flex',
    border: '1px solid #EBEFF0',
    width: 'auto',
    height: 'auto',
    maxHeight: '95%',
    boxShadow: '0 6px 24px 0 rgba(49,54,56,0.1)',
    backgroundColor: '#fff',
    padding: '15px',
    overflow: 'hidden',
    borderRadius: 2,
    '& *::-webkit-scrollbar': {
      width: 3,
      height: 8,
    },
    '& *::-webkit-scrollbar-track': {
      backgroundColor: 'var(--ice-blue)',
    },
    '& *::-webkit-scrollbar-thumb': {
      backgroundColor: 'var(--n4)',
    },
    '& *::-webkit-scrollbar-thumb:hover': {
      backgroundColor: 'var(--sn1)',
    },
  },
  dialogCt: {
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  btnClose: {
    position: 'absolute',
    background: 'transparent',
    top: 8,
    right: 8,
    border: 0,
  },
};

export default withStyles(styles)(DialogContent);
