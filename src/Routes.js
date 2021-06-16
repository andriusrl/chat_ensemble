import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Feed from "./containers/Feed";
import Login from "./containers/Login";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/feed" component={Feed} exact />
      </Switch>
    </BrowserRouter>
  );
}
export default Routes;