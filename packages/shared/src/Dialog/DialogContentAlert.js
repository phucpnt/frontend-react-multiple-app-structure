import React from "react";
import withStyles from 'react-jss'; // willupdate

const DialogContentAlert = ({
  classes,
  customStyle,
  customKlass,
  onClose,
  mainContent,
}) => {
  const dialogContentStyle = [classes.dialogContent];
  if (customKlass) dialogContentStyle.push(customKlass);

  return (
    <div
      className={dialogContentStyle.join(" ")}
      style={customStyle}
    >
      <div className={classes.dialogCtInner}>
        <div className={classes.iconAlert}>
          <svg
            width="22px"
            height="22px"
            viewBox="0 0 22 22"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M20.6108066,10.636278 C20.704649,16.0510564 16.222383,20.518544 10.8068658,20.6131253 C5.39208743,20.7069677 1.09602832,16.3924357 1.00144704,10.9776573 C0.907604673,5.5621401 5.3906096,1.09465241 10.8068658,1.00154897 C16.222383,0.906228769 20.5169643,5.22223862 20.6108066,10.636278 Z M11,12.2394089 L11,6 L11,12.2394089 Z M10.8927349,14 L10.8764787,14 C10.3843605,14.0081281 9.99199596,14.414532 10.000124,14.9066502 C10.0082521,15.3935961 10.406528,15.7815271 10.891257,15.7815271 L10.9075132,15.7815271 C11.3996314,15.7726601 11.791996,15.367734 11.783129,14.8763547 C11.7750009,14.387931 11.3774639,14 10.8927349,14 Z" stroke="#FFFFFF" fill="#D0021B"></path>
          </svg>
        </div>
        <div className={classes.mainCt}>
          {mainContent}
        </div>
      </div>
      <button type="button" className={classes.btnClose} onClick={onClose}>
        <svg
          width="10px" height="8px" viewBox="0 0 10 8"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5,4 L9,0 L5,4 L9,8 L5,4 Z M5,4 L1,8 L5,4 L1,0 L5,4 Z" stroke="#BEB3AB"></path>
        </svg>
      </button>
    </div>
  )
};

const styles = {
  dialogContent: {
    position: "relative",
    borderRadius: 2,
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.5)",
    backgroundColor: "#434a54",
    fontSize: 12,
    fontWeight: 300,
    color: "#d1d1d1",
  },
  dialogCtInner: {
    padding: "15px 30px 15px 10px",
    display: "flex",
  },
  iconAlert: {
    flex: 0,
    flexBasis: 50,
    alignSelf: "center",
    textAlign: "center",
  },
  btnClose: {
    position: "absolute",
    background: "transparent",
    top: 8,
    right: 8,
    border: 0,
  }
}

export default withStyles(styles)(DialogContentAlert);
