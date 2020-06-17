import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-components';
import { PrivateRoute, AuthRoute } from './routes/index';
import {
  TextfieldDemo, InputDemo, ChildrenDemo, TraineeRoutes, NotFound,
} from './Pages';
import { SnackBarProvider } from './contexts';
import apolloClient from './libs/apollo-client';
import Login from './Pages/Login/wrapper';


function App() {
  return (
    <SnackBarProvider>
      <ApolloProvider client={apolloClient}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <AuthRoute exact path="/login" component={Login} />
            <PrivateRoute path="/trainee" component={TraineeRoutes} />
            <PrivateRoute exact path="/text-field-demo" component={TextfieldDemo} />
            <PrivateRoute exact path="/input-demo" component={InputDemo} />
            <PrivateRoute exact path="/children-demo" component={ChildrenDemo} />
            <PrivateRoute component={NotFound} />
          </Switch>
        </Router>
      </ApolloProvider>
    </SnackBarProvider>
  );
}

export default App;
