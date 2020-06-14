import React from "react";

import { Router as BrowserRouter } from "react-router-dom";
import history from "utils/history";

import GlobalStyle from "styles/globalStyles";
import Notification from "components/Notification";
import NotificationService from "services/NotificationService";
import Routes from "./routes";

function App() {
  return (
    <>
      <BrowserRouter history={history}>
        <Routes />
      </BrowserRouter>
      <GlobalStyle />
      <Notification ref={(ref) => NotificationService.setRef(ref)} />
    </>
  );
}

export default App;
