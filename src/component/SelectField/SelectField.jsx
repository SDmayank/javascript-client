import React from 'react';
import PropTypes from 'prop-types';
import { Select, P } from './style';


const SelectField = (props) => {
  const {
    options, defaultOption, onChange, error, onBlur,
  } = props;
  return (
    <>
      <Select onChange={onChange} onBlur={onBlur}>
        {defaultOption && <option>{defaultOption}</option>}
        {
          options && options.length && options.map(({ value, label }) => (
            <option key={label} value={value} error={error} onChange={onChange}>
              {label}
            </option>
          ))
        }
      </Select>
      <P>
        {error}
      </P>
    </>
  );
};
SelectField.propTypes = {
  defaultOption: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  onBlur: PropTypes.objectOf.isRequired,

};
SelectField.defaultProps = {
  error: '',
};

export default SelectField;
