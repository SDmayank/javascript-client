/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { PropTypes } from 'prop-types';
import { Footer } from '../components';


const AuthLayout = ({ children }) => (
  <div>
    <div>{children}</div>
    <div><Footer /></div>
  </div>
);

AuthLayout.propTypes = {
  children: PropTypes.object,
};
AuthLayout.defaultProps = {
  children: undefined,
};
export default AuthLayout;
