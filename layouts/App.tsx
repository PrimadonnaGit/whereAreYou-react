import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// Code Splitting
import loadable from '@loadable/component';
const Login = loadable(() => import('@pages/Login'));
const Register = loadable(() => import('@pages/Register'));
const Home = loadable(() => import('@pages/Home'));

const App = () => {
  return (
    <Switch>
      <Redirect exact path="/" to="/login" />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/home" component={Home} />
    </Switch>
  );
};

export default App;
