import React from 'react';
import Tippy from '@tippy.js/react';

export const Tooltip = props => <Tippy {...props} />
Tooltip.defaultProps = {
  animation: 'fade',
  arrow: true,
  delay: 150,
  theme: 'translucent',
}

export const Popover = props => <Tippy {...props} />
Popover.defaultProps = {
  animateFill: false,
  animation: 'scale',
  interactive: true,
  interactiveBorder: 10,
  theme: 'light-border',
  trigger: 'click',
}

// In another file
// import { Tooltip, Popover } from './Tippy'