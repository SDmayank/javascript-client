import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const RadioGroup = (props) => {
  // console.log('inside radio group', props);
  const { options, onChange, error } = props;
  return (
    <>

      {
        options && options.length && options.map(({ value, label }) => (
          <Fragment key={label}>
            <input type="radio" name="cricketGroup" value={value} error={error} onChange={onChange} />
            {label}
            <br />
          </Fragment>
        ))
      }
    </>

  );
};
RadioGroup.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};
RadioGroup.defaultProps = {
  error: '',
};
export default RadioGroup;
