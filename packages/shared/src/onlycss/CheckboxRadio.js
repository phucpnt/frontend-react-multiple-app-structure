/**
 * https://codepen.io/uixcrazy/pen/QymRpr
 */

import React from 'react';
import { label2Id } from '../core/utils';

const itemName = 'hoa bồ công anh';
/**
 * viết lại một list test
 */

const CheckboxRadio = () => (
  <main>
    <div style={{
      boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
      borderRadius: 3,
      width: 400,
      padding: 20,
      color: '#555',
    }}>

      <h1>radio</h1>
      <input type="radio" id="test__radio" name="gender"/>
      <label htmlFor="test__radio">ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ip</label>
      <input type="radio" id="ngoc" name="gender"/>
      <label htmlFor="ngoc">ngoc</label>

      <h1>checkbox</h1>
      <input type="checkbox" id={label2Id(itemName)} />
      <label htmlFor={label2Id(itemName)}>{itemName}</label>

    </div>
  </main>
);

export default CheckboxRadio;
