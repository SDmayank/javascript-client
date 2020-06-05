import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import { PrivateRoute, AuthRoute } from './routes/index';
import {
  TextfieldDemo, InputDemo, ChildrenDemo, TraineeRoutes, NotFound, Login,
} from './Pages';
import { SnackBarProvider } from './contexts'

function App() {
  return (
    <Router>
      <div>
        <SnackBarProvider>
          <Switch>
            <Route exact path="/">
              <Redirect to="/trainee" />
            </Route>
            <AuthRoute exact path="/login" component={Login} />
            <PrivateRoute path="/trainee" component={TraineeRoutes} />
            <PrivateRoute exact path="/text-field-demo" component={TextfieldDemo} />
            <PrivateRoute exact path="/input-demo" component={InputDemo} />
            <PrivateRoute exact path="/children-demo" component={ChildrenDemo} />
            <PrivateRoute component={NotFound} />
          </Switch>
        </SnackBarProvider>
      </div>
    </Router>
  );
}

export default App;
