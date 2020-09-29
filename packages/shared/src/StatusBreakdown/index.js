
import React from 'react';
import withStyles from 'react-jss'; // willupdate

const StatusBreakdown = ({
  items=[
    {
      color: '#dd4a39', // red
      name: 'Bad',
      value: 20,
    },
    {
      color: '#f39c13', // yellow
      name: 'Average',
      value: 35,
    },
    {
      color: '#02c0ef', // blue
      name: 'Good',
      value: 90,
    },
  ],
  classes,
}) => {
  const totalMsgs = items.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0);
  const _items = [].concat(items).filter(i => i.value > 0);
  _items.forEach((item, index) => {
    let _width = (100 * item.value) / totalMsgs;
    item.width = (index > 0) ? _width + _items[index-1].width : _width;
  })
  return (
    <div className={classes.wrapper}>
      <div className={classes.rangeBar}>
        {_items.reverse().map((item, index) => (
          <span
            key={index}
            className={classes.rangeBarItem}
            style={{
              display: (item.value <= 0 || item.width <= 2) ? 'none' : 'block',
              width: `${item.width}%`,
              backgroundColor:item.color
            }}/>
        ))}
      </div>
      <div className={classes.noticed}>
        {
          items.map((item, index) => (
            <div key={index} className={classes.noticedItem}>
              <span className={classes.noticedIcon} style={{backgroundColor:item.color}}/>
              <span className={classes.noticedText}>{item.name}</span>
              <span className={classes.noticedNo} style={{color:item.color}}>
                {item.value}
              </span>
            </div>
          ))
        }
      </div>
    </div>
  );
};

const styles = {
  wrapper: {},

  rangeBar: {
    position: 'relative',
    width: '100%',
    maxWidth: 200,
    height: 8,
    borderRadius: 5.5,
    display: 'flex',
    border: 'solid 1px #fff',
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  rangeBarItem: {
    height: 6,
    borderRight: 'solid 1px #fff',
    backgroundColor: '#eee',
    position: 'absolute',
    '&:first-child': {
      borderTopRightRadius: 5.5,
      borderBottomRightRadius: 5.5,
      borderRight: 0,
    },
    '&:last-child': {
      borderTopLeftRadius: 5.5,
      borderBottomLeftRadius: 5.5,
    },
  },

  noticed: {},
  noticedItem: {
    display: 'flex',
    alignItems: 'center',
    margin: '5px 0',
    fontSize: 11,
  },
  noticedIcon: {
    display: 'block',
    width: 8,
    height: 8,
    borderRadius: 4,
    zIndex: 10,
    marginRight: 8,
    border: '#fff',
  },
  noticedText: {
    color: '#555',
    width: 56,
  },
  noticedNo: {
    fontSize: 10,
    fontWeight: 'bold',
  },
};

export default withStyles(styles)(StatusBreakdown);

/**
 * test case
 *
 * data có 1, 2, 3, 5
 *
 */