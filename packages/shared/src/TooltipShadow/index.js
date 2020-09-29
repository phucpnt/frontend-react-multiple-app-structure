
import React from 'react';
import withStyles from 'react-jss'; // willupdate

const TooltipShadow = ({
  content,
  classes,
}) => {
  return (
    <div className={classes.container}>
      <div className={classes.content}>{content}</div>
      <span className={classes.searchArrow} />
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    display: 'inline-block',
    verticalAlign: 'top',
  },
  content: {
    borderRadius: 2,
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.3)",
    backgroundColor: '#fff',
    lineHeight: '1.2',
    color: 'var(--brownish-grey)',
    fontSize: "0.625rem",
    padding: "0.625rem",
    display: "block",
    '& .title': {
      fontSize: '0.6875rem',
      fontWeight: '500',
      lineHeight: '1.18',
      color: 'var(--purplish-brown)',
      marginBottom: 5,
    }
  },
  searchArrow: {
    height: "0.625rem",
    position: "relative",
    overflow: "hidden",
    display: "block",
    top: 0,
    "&:before": {
      content: '""',
      position: "absolute",
      width: "1.25rem",
      height: "1.25rem",
      background: "#fff",
      transform: "rotate(45deg)",
      bottom: "0.5rem",
      left: "50%",
      marginLeft: -10,
      boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.35)"
    }
  },
};

export { TooltipShadow as TooltipShadowNoStyle };
export { styles as defaultStyles };
export default withStyles(styles)(TooltipShadow);
