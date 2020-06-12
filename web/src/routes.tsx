import React, { useEffect, useState } from "react";
import {
  Router as BrowserRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import history from "utils/history";

import Loading from "components/Loading";

import SingInPage from "pages/SingIn";

const Routes: React.FC = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route path="/login" exact component={SingInPage} />
        <Route path="*">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
