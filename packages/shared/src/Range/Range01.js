
import React from 'react';
import withStyles from 'react-jss'; // willupdate

const Range01 = ({
  items, //=[6.24, -5.6, -3.09, 3.39, 2.49, -3.16],
  classes,
}) => {
  const maxEps = Math.max.apply(null, items);
  const minEps = Math.min.apply(null, items);
  const offset = (maxEps - minEps) / items.length; // create padding Left and Right
  const maxNumber = maxEps - minEps + offset;
  const __st = (0-minEps)+(offset/2);

  return items.map((item, index) => {
    const estPos = ((item+__st) / maxNumber) * 100;
    return (
      <div key={`ppp-${index}`} className={classes.range}>
        <span className={classes.rangeBar}>
          <i
            className={classes.rangePos}
            style={{ left: `${estPos}%` }}
          />
          <span
            className={classes.rangeNo}
            style={{ left: `${estPos}%` }}
          >{item}</span>
        </span>
      </div>
    );
  });
};

const styles = {
  range: {
    padding: '10px 0',
  },
  rangeBar: {
    height: 8,
    backgroundColor: '#e8e8e8',
    display: 'block',
    position: 'relative',
  },
  rangePos: {
    top: '-2px',
    position: 'absolute',
    left: 0,
    display: 'block',
    width: 1,
    height: 12,
    zIndex: 10,
    backgroundColor: '#434a54',
  },
  rangeNo: {
    position: 'absolute',
    left: 0,
    zIndex: '10',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 10,
    top: 14,
    marginLeft: -10,
  },
};

export default withStyles(styles)(Range01);
