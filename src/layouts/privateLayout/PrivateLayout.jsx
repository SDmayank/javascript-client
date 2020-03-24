/* eslint-disable react/forbid-prop-types */
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
  children: PropTypes.object,
};
PrivateLayout.defaultProps = {
  children: undefined,
};

export default PrivateLayout;
