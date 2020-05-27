import React from 'react';
import { Switch, Route } from 'react-router-dom';

import RegisterUser from './pages/RegisterUser';
import Home from './pages/Home';
import Login from './pages/Login';
import PrivateRoute from './PrivateRoute';
import PrivatePage from './pages/PrivatePage';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/register">
        <RegisterUser />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <PrivateRoute exact path="/private">
        <PrivatePage />
      </PrivateRoute>
    </Switch>
  );
}