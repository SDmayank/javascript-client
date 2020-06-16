/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { PropTypes } from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { AuthLayout } from '../layouts/index';

const AuthRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('Token');
  return (
    <>
      {token ? (
        <Redirect to="/trainee" />
      )
        : (
          <Route
            {...rest}
            render={(matchProps) => (
              <AuthLayout>
                <Component {...matchProps} />
              </AuthLayout>
            )}
          />
        )}
    </>
  );
};

AuthRoute.propTypes = {
  component: PropTypes.instanceOf(Object).isRequired,
};

export default AuthRoute;
