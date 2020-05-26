import React from 'react';
import { Switch, Route } from 'react-router-dom';

import RegisterUser from './pages/RegisterUser';
import Home from './pages/Home';
import Login from './pages/Login';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={RegisterUser} />
      <Route exact path="/login" component={Login} />
    </Switch>
  );
}