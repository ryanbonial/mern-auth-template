import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';

import RegisterUser from './pages/RegisterUser';
import Home from './pages/Home';
import Login from './pages/Login';
import PrivateRoute from './PrivateRoute';
import PrivatePage from './pages/PrivatePage';
import { AuthContext } from './context/AuthContext';

export default function Routes() {
  const authContext = useContext(AuthContext)
  if (authContext.authState.token === null){
    return (<div>Loading</div>)
  }

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