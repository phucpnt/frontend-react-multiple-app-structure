import React from 'react';
import { createUseStyles } from 'react-jss';
import { Route, Switch } from 'react-router-dom';
import { ComponentSimple } from 'sub1/components/component-simple';
import { connectComponentSimple } from 'sub1/containers/component-simple';
import { HomePage } from './homepage';
import { NotFoundPage } from './not-found';

const CComponentSimple = connectComponentSimple(ComponentSimple);

export function Pages() {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <CComponentSimple />
      <Switch>
        <Route path="/homepage" component={HomePage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </div>
  );
}

const useStyle = createUseStyles({
  root: {
    background: '#dfdfdf',
  },
});
