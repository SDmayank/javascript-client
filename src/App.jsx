import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import { PrivateRoute, AuthRoute } from './routes/index';
import {
  TextfieldDemo, InputDemo, ChildrenDemo, Trainee, NotFound, Login,
} from './Pages';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/trainee" />
        </Route>
        <AuthRoute exact path="/login" component={Login} />
        <PrivateRoute path="/trainee" component={Trainee} />
        <PrivateRoute exact path="/text-field-demo" component={TextfieldDemo} />
        <PrivateRoute exact path="/input-demo" component={InputDemo} />
        <PrivateRoute exact path="/children-demo" component={ChildrenDemo} />
        <PrivateRoute component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
