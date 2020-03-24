import React from 'react';
import { PropTypes } from 'prop-types';
import { Navbar } from '../components';

const PrivateLayout = ({ children }) => (
  <div>
    <div><Navbar /></div>
    <div>{children}</div>
  </div>
);

PrivateLayout.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.object.isRequired,
};

export default PrivateLayout;
