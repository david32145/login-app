import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
  }

  * {
    padding: 0;
    margin: 0;
    outline: none;

    box-sizing: border-box;

    font-family: "Roboto", Arial, Helvetica, sans-serif;
    --webkit-font-smoothing: antialiased
  }
`;

export default GlobalStyle;
