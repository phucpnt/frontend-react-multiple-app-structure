import React, { Component } from 'react';
import { createUseStyles } from 'react-jss';

export function NotFoundPage() {
  const classes = useStyles();
  return (
    <div className={classes.container404}>
      <div class={classes.content}>
        <h1>404</h1>
        <h2>Page not found</h2>
      </div>
    </div>
  );
}

const useStyles = createUseStyles({
  container404: {
    position: 'fixed',
    top: '126px',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
    background: '#f0f2f3',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    '& h1': {
      fontSize: '122px',
      fontWeight: 100,
      marginBottom: 5,
    },
    '& h2': {
      fontSize: '30px',
      fontWeight: 100,
      marginBottom: 10,
    },
    '& a': {
      padding: '0 15px',
      borderRadius: '0px',
      backgroundColor: '#fff',
      fontSize: '16px',
      lineHeight: 2,
      color: '#3f363f',
      cursor: 'pointer',
      borderStyle: 'solid',
      border: '1px solid #ccc',
    },
  },
});
