import React from 'react';
import { storiesOf } from '@storybook/react';
import { STORIES_NAME } from './constants';
import withStyles from 'react-jss';

import NoData from '../NoData';
import NoDataReadme from './NoData.md';
import NoDataSource from '!!raw-loader!../NoData';

const NoDataCusto = withStyles({
  yourCustom: {
    background: '#5d705f',
    height: 300,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }
})(({classes}) => {
  return (
    <NoData
    style={{color: '#fff'}}
    className={classes.yourCustom}
  >
      No Data here, you can write any text...
  </NoData>
  )
});

storiesOf(STORIES_NAME, module)
  .add('NoData', () => (
    <main>
      <h1 className="stories-h1">Case ::: no params</h1>
      <NoData /> <span>and something here!!!</span>

      <h1 className="stories-h1">Case ::: custom style display inline</h1>
      <NoData style={{display:'inline'}}/> <span>and something here!!!</span>

      <h1 className="stories-h1">Case ::: NORMAL</h1>
      <div className="stories-box">
        <NoData />
      </div>

      <h1 className="stories-h1">Case ::: custom style</h1>
      <div className="stories-box" style={{
        height: 170,
        display: "flex",
        alignItems: "center",
        // extra
        position: "relative",
        justifyContent: "center",
        }}>
        <NoData />
      </div>

      <h1 className="stories-h1">Case ::: custom style</h1>
      <div style={{position:"relative", height:200,border:'1px solid #eee'}}>
        <NoData style={{
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          position: "absolute",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}/>
      </div>

      <h1 className="stories-h1">Case ::: test with withStyles --- not yet</h1>
      <NoDataCusto />
    </main>
  ),
  {
    notes: { markdown: NoDataReadme },
    source: NoDataSource,
  }
)
