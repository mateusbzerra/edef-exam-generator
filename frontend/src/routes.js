import React from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  Component
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "./style.css";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (sessionStorage.getItem("@token")) {
        return <Component {...props} />;
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
        <Route path="/login" component={Login}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default routes;
