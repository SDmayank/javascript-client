import React from 'react';
import PropTypes from 'prop-types';
import { Select } from './style';


const SelectField = (props) => {
  const {
    options, defaultOption, onChange, error,
  } = props;
  return (
    <Select onChange={onChange}>
      {defaultOption && <option>{defaultOption}</option>}
      {
        options && options.length && options.map(({ value, label }) => (
          <option key={label} value={value} error={error} onChange={onChange}>{label}</option>
        ))
      }
    </Select>
  );
};
SelectField.propTypes = {
  defaultOption: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,

};
SelectField.defaultProps = {
  error: '',
};

export default SelectField;
