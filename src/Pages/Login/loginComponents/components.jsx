import React from 'react';
import PropTypes from 'prop-types';
import {
  TextField, InputAdornment,
} from '@material-ui/core';


const LoginFields = (props) => {
  const {
    helperText, error, onChange, onBlur, type, label, icons,
  } = props;
  const Icon = icons;
  return (
    <>
      <TextField
        required
        id="outlined-required"
        label={label}
        variant="outlined"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon />
            </InputAdornment>
          ),
        }}
        helperText={helperText}
        error={error}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
      />
    </>
  );
};

LoginFields.propTypes = {
  helperText: PropTypes.string,
  error: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  icons: PropTypes.instanceOf(Object),
};

LoginFields.defaultProps = {
  helperText: false,
  error: false,
  type: false,
  label: '',
  icons: {},
};

export default LoginFields;
