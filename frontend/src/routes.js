import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';

import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Discipline from './pages/Discipline';
import Users from './pages/Users';
import Question from 'pages/Question';
import AddQuestion from 'pages/Question/Show';

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

export default function Routes() {
  const UserStore = useSelector(state => state.UserStore);
  const dispatch = useDispatch();
  function decodeToken() {
    const token = localStorage.getItem('@token');
    return jwt.decode(token);
  }
  useEffect(() => {
    const decoded = decodeToken();
    dispatch({ type: 'SET_USER', payload: decoded });
    console.log('dispatch changed');
  }, [dispatch]);
  useEffect(() => {
    console.log('user-store', UserStore);
  }, [UserStore]);
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path="/" component={Home}></PrivateRoute>
        <PrivateRoute
          exact
          path="/disciplinas"
          component={Discipline}
        ></PrivateRoute>
        <PrivateRoute path="/professores" component={Users}></PrivateRoute>
        <PrivateRoute
          path="/disciplinas/:id/questoes"
          component={Question}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path="/questao"
          component={AddQuestion}
        ></PrivateRoute>
        <PrivateRoute
          path="/questao/:id"
          component={AddQuestion}
        ></PrivateRoute>
        <Route path="/login" component={Login}></Route>
      </Switch>
    </BrowserRouter>
  );
}
