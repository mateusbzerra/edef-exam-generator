import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Discipline from './pages/Discipline';
import Users from './pages/Users';
import './style.css';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (localStorage.getItem('@token')) {
        return (
          <>
            <Header></Header>
            <Component {...props} />
          </>
        );
      } else {
        return <Redirect to="/login" />;
      }
    }}
  />
);

function routes() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path="/" component={Home}></PrivateRoute>
        <PrivateRoute path="/disciplinas" component={Discipline}></PrivateRoute>
        <PrivateRoute path="/professores" component={Users}></PrivateRoute>
        <Route path="/login" component={Login}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default routes;
