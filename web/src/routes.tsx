import React, { useEffect, useState } from "react";
import {
  RouteProps,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";

import history from "utils/history";

import Loading from "components/Loading";

import SingInPage from "pages/SingIn";
import SingUpPage from "pages/SingUp";
import NewFormPage from "pages/Form/New";
import LoginService from "services/LoginService";

const PrivateRoute: React.FC<RouteProps> = (props) => {
  if (!LoginService.isLogged()) {
    return <Redirect to="/sign" />;
  }

  return <Route {...props} />;
};

const Routes: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  useEffect(() => {
    if (LoginService.isLogged()) {
      if (location.pathname === "/sign" || location.pathname === "/join") {
        history.push("/forms/new");
      }
    }
    setLoading(false);
  }, [location, history]);

  return (
    <Switch>
      {loading && <Loading />}
      <Route path="/sign" exact component={SingInPage} />
      <Route path="/join" exact component={SingUpPage} />
      <PrivateRoute path="/forms/new" exact component={NewFormPage} />
      <Route path="*">
        <Redirect to="/sign" />
      </Route>
    </Switch>
  );
};

export default Routes;
