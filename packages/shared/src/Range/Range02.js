import React from "react"; // eslint-disable-line
import withStyles from 'react-jss'; // willupdate

const Range02 = ({
  classes,
  min = -29,
  max = 74,
  current = 3, // position center = 22.5
  }) => {

  const pos = ((current - min)/(max - min))*100;

  return (
    <div className={classes.range}>
      <span className={classes.rangeBar} />
      {current !== null && (
        <i
          className={classes.rangeSector}
          style={{
            left: `${pos}%`
          }}
        />
      )}
      <span className={classes.minNo}>{min}</span>
      <span className={classes.maxNo}>{max}</span>
    </div>
  )
}

const rangeBarStyle = {
  range: {
    position: 'relative',
    display: 'block',
    width: 113,
    height: 25,
    // margin: '0 auto',
  },
  rangeBar: {
    width: '100%',
    height: 8,
    marginTop: 5,
    borderRadius: 5.5,
    display: 'inline-block',
    verticalAlign: 'top',
    backgroundColor: '#d8d8d8',
  },
  rangeSector: {
    display: 'inline-block',
    background: '#000',
    width: 8,
    marginLeft: '-4px',
    height: 13,
    position: 'absolute',
    top: 0,
    left: '750%',
    zIndex: 10,
  },
  minNo: {
    fontSize: 10,
    color: 'var(--n3)',
    float: 'left',
  },
  maxNo: {
    fontSize: 10,
    color: 'var(--n3)',
    float: 'right',
  },
}

export default withStyles(rangeBarStyle)(Range02);
