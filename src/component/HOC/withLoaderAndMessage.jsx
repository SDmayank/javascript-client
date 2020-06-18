/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

const withLoaderAndMessage = (WrappedComponent) => (props) => (
  <WrappedComponent {...props} />
);
export default withLoaderAndMessage;
