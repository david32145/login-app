import React from "react";

import GlobalStyle from "styles/globalStyles";
import Notification from "components/Notification";
import Routes from "./routes";

function App() {
  return (
    <>
      <Routes />
      <GlobalStyle />
      <Notification ref={(ref) => console.log(ref)} />
    </>
  );
}

export default App;
