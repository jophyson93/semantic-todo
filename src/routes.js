import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Home from './home';
import Todos from './todos';
import About from './about';
import Login from './auth/login';
import Registration from './auth/registration';

const Routes = () => (
  <Route path="/">
    <IndexRoute component={Home} />
    <Route path="/todos" component={Todos} />
    <Route path="/about" component={About} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Registration} />
  </Route>
);

Routes.displayName = 'Routes';

export default Routes;
