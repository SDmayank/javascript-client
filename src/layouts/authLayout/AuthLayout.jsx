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
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.object.isRequired,
};
export default AuthLayout;
