import PropTypes from 'prop-types';
import React from 'react';
import Input, { P } from './style';

const TextField = (props) => {
  const { onChange, error, onBlur } = props;
  return (
    <>
      <Input
        type="text"
        onChange={onChange}
        onBlur={onBlur}

      />

      <P>
        {error}
      </P>
    </>
  );
};
TextField.propTypes = {
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  onBlur: PropTypes.objectOf.isRequired,
};
TextField.defaultProps = {
  error: '',
};
export default TextField;
