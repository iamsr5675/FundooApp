import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignUp from "../pages/signup/SignUp";
import SignIn from "../pages/signin/SignIn";
import Dashboard from "../pages/dashboard/Dashboard";

function Router() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route path="/SignUp" component={SignUp} />
          <Route path="/Dashboard" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Router;
