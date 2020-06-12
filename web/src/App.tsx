import React from "react";

import GlobalStyle from "styles/globalStyles";
import Notification from "components/Notification";
import NotificationService from "services/NotificationService";
import Routes from "./routes";

function App() {
  return (
    <>
      <Routes />
      <GlobalStyle />
      <Notification ref={(ref) => NotificationService.setRef(ref)} />
    </>
  );
}

export default App;
