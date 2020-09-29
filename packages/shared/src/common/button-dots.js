import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyle = createUseStyles({
  btnMoreAction: {
    height: 30,
    display: 'block',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    border: 0,
    '&:hover, &:focus': {
      '--dot-color': 'var(--g1)',
    },
  },
});

export function ButtonDots({ classes = { btnMoreAction: undefined } }) {
  const defClasses = useStyle();
  return (
    <button className={classes.btnMoreAction || defClasses.btnMoreAction}>
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 80">
        <g fill="var(--dot-color, #999)" fill-rule="evenodd">
          <circle cx="8" cy="8" r="8" />
          <circle cx="8" cy="72" r="8" />
          <circle cx="8" cy="40" r="8" />
        </g>
      </svg>
    </button>
  );
}
