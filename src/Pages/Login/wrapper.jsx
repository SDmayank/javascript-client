import React from 'react';
import {
  useHistory,
} from 'react-router-dom';
import { Mutation } from '@apollo/react-components';
import { LOGIN_USER } from './mutation';
import Login from './Login';

export default () => {
  const history = useHistory();
  console.log('history', history);
  return (
    <Mutation mutation={LOGIN_USER}>
      {(loginUser) => (
        <>
          <Login LoginUser={loginUser} history={history} />
        </>
      )}
    </Mutation>
  );
};
