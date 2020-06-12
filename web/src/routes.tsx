import React, { useEffect, useState } from "react";
import { Router as BrowserRouter, Switch, Route } from "react-router-dom";

import history from "utils/history";
import Loading from "components/Loading";

const Routes: React.FC = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route path="/login" exact>
          <h1>Login</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
