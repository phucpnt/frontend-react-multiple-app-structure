import React from 'react';
import Terms from './terminology';
import withStyles from 'react-jss';

export const UnderstandAnalyticsTable = withStyles({
  root: {
    borderSpacing: 0,
    borderCollapse: 'collapse',

    '& thead': {
      background: '#f3f3f3',
      fontWeight: 700,
    },
    '& tr:hover': {
      background: '#fafafa',
    }
  },
  

  cellTerm: {
    fontWeight: 700,
    borderRightStyle: "solid",
    padding: "1em",
    borderBottomColor: "#d9d9d9",
    borderTopWidth: "1pt",
    borderRightWidth: "1pt",
    borderLeftColor: "#d9d9d9",
    verticalAlign: "middle",
    borderRightColor: "#d9d9d9",
    borderLeftWidth: "1pt",
    borderTopStyle: "solid",
    borderLeftStyle: "solid",
    borderBottomWidth: "1pt",
    width: "141.8pt",
    borderTopColor: "#d9d9d9",
    borderBottomStyle: "solid",
    verticalAlign: "top",
  },

  cellDef: {
    borderRightStyle: "solid",
    padding: "1em",
    borderBottomColor: "#d9d9d9",
    borderTopWidth: "1pt",
    borderRightWidth: "1pt",
    borderLeftColor: "#d9d9d9",
    verticalAlign: "bottom",
    borderRightColor: "#d9d9d9",
    borderLeftWidth: "1pt",
    borderTopStyle: "solid",
    borderLeftStyle: "solid",
    borderBottomWidth: "1pt",
    width: "319.5pt",
    borderTopColor: "#d9d9d9",
    borderBottomStyle: "solid"
  }
})(function UnderstandAnalytic({classes}){
  return (
    <table className={classes.root}>
      <thead>
        <tr>
          <td className={classes.cellTerm}>Term</td>
          <td className={classes.cellDef}>Definition</td>
        </tr>
      </thead>
      <tbody>
        {Terms.map(i => {
          return (
            <tr>
              <td className={classes.cellTerm}>{i.Term}</td>
              <td className={classes.cellDef}>{i.Definition}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
})