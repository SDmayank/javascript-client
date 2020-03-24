/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { PropTypes } from 'prop-types';
import { Route } from 'react-router-dom';
import { PrivateLayout } from '../layouts/index';

const PrivateRoute = ({ component: Component, ...rest }) => (

  <Route
    {...rest}
    render={(matchProps) => (
      <PrivateLayout>
        <Component {...matchProps} />
      </PrivateLayout>
    )}
  />
);


PrivateRoute.propTypes = {
  component: PropTypes.instanceOf(Object).isRequired,
};

export default PrivateRoute;
