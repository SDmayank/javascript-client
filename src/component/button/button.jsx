import React from 'react';
import PropTypes from 'prop-types';
import { Buttons } from './style';

export default function Button(props) {
  const {
    color, disabled, style, value, onClick,
  } = props;
  console.log('disabled', value);
  return (
    <>
      <Buttons type={value} color={color} disabled={disabled} onClick={onClick} style={style}>{value}</Buttons>
    </>
  );
}

Button.propTypes = {
  // value: PropTypes.string.isRequired,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.objectOf(PropTypes.string),
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  color: 'default',
  disabled: false,
  style: {},

};
