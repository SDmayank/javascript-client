/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { PropTypes } from 'prop-types';
import { Route } from 'react-router-dom';
import { AuthLayout } from '../layouts/index';

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(matchProps) => (
      <AuthLayout>
        <Component {...matchProps} />
      </AuthLayout>
    )}
  />
);
AuthRoute.propTypes = {
  component: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default AuthRoute;
