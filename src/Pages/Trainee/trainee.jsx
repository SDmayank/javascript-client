/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TraineeList from './TraineeList';
import TraineeDetail from './TraineeDetail';

const TraineeRoutes = (props) => {
  console.log(props);
  const { match: { path } } = props;
  return (

    <Switch>
      <Route exact path={path} component={TraineeList} />
      <Route exact path={`${path}/:id`} component={TraineeDetail} />
    </Switch>
  );
};
export default TraineeRoutes;
