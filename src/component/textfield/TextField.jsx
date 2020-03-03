/* eslint-disable */
import React, { Component } from 'react';
import Input from '../../component/textfield/style';

export default function Textfield(props) {
  const { value , disabled} = props;
  return(
    <Input type="text" value={value} disabled={(disabled)} />
  )
}