import PropTypes from 'prop-types';
import React from 'react';
import Input from './style';

const TextField = (props) => {
  console.log('textfield demo', props);
  const { onChange, error } = props;
  return (
    <Input
      type="text"
      onChange={onChange}
      error={error}
    />
  );
};
TextField.propTypes = {
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};
TextField.defaultProps = {
  error: '',
};
export default TextField;
