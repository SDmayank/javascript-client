import React from 'react';
import { Textfield } from '../../component/index';
import Slider from '../../component/slider/Slider';
import { banners } from '../../config/constant';

import { Para, P } from '../../component/textfield/style';

const TextfieldDemo = () => (
  <div>
    <Slider altText="hello" banners={banners} defaultBanner="default.png" duration={2000} height={200} random={false} />
    <Para>This is disabled input</Para>
    <Textfield value="Disabled Input" disabled />
    <Para>A valid input</Para>
    <Textfield value="Accessible" />
    <Para>A input with error</Para>
    <Textfield value={101} />
    <P>Could not be greater than 101</P>

  </div>
);
export default TextfieldDemo;
