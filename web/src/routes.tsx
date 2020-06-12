import React from "react";
import { Router as BrowserRouter, Switch, Route } from "react-router-dom";

import history from "utils/history";

const Routes: React.FC = () => (
  <BrowserRouter history={history}>
    <Switch>
      <Route path="/login" exact>
        <h1>Login</h1>
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Routes;
