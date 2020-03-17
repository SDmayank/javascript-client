import React from 'react';
import TextField, { Para, P, Slider } from '../../component';
import { banners } from '../../config/constant';

const TextfieldDemo = () => (
  <div>
    <Slider altText="hello" banners={banners} defaultBanner="default.png" duration={2000} height={200} random={false} />
    <Para>This is disabled input</Para>
    <TextField value="Disabled Input" disabled />
    <Para>A valid input</Para>
    <TextField value="Accessible" />
    <Para>A input with error</Para>
    <TextField value={101} />
    <P>Could not be greater than 101</P>

  </div>
);
export default TextfieldDemo;
