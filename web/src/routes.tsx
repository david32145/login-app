import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";

import Loading from "components/Loading";

import SingInPage from "pages/SingIn";
import SingUpPage from "pages/SingUp";

const Routes: React.FC = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        {loading && <Loading />}
        <Route path="/sign" exact component={SingInPage} />
        <Route path="/join" exact component={SingUpPage} />

        <Route path="*">
          <Redirect to="/sign" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
