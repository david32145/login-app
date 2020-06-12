import styled from "styled-components";

import singInBg from "assets/sing-in-bg.svg";

export const Container = styled.div`
  display: flex;
  height: 100%;

  .landing {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: url(${singInBg});
    background-repeat: no-repeat;
    background-size: contain;

    img {
      height: 300px;
      width: 400px;
    }

    h1 {
      max-width: 450px;
      margin-top: 50px;
      text-align: center;
      font-size: 30px;
    }
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 380px;
    padding: 40px;
    background-color: rgba(20, 33, 61, 0.9);

    form {
      width: 100%;

      h2 {
        color: #ffffff;
        font-size: 30px;
        margin-bottom: 50px;
      }

      .input-text {
        margin-bottom: 30px;
      }

      .btn-sing-in {
        margin-top: 50px;
      }

      a {
        display: block;
        text-align: center;
        font-size: 14px;
        text-decoration: none;
        font-weight: 400;
        color: #6fffe9;
        margin-top: 20px;
      }
    }

    .logo {
      margin: 50px auto 0;
    }
  }
`;
