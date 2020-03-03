/* eslint-disable */
import React, { Component } from 'react';
import Textfield from '../../component/textfield/';

import {Para, Div, P} from '../../component/textfield/style'
//import  from '../../component/textfield/style'

const TextfieldDemo = () => (
  <div >
  <Para>This is disabled input</Para>
  <Textfield value="Disabled Input" disabled  />
  <Para>A valid input</Para>
  <Textfield  value="Accessible" />
  <Para>A input with error</Para>
  <Textfield value={101} />
  <P>Could not be greater than 101</P>
  
  </div>
);
export default TextfieldDemo;
