import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100%;

  main {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: scroll;
    padding: 30px 20px;
    background-color: #f7fdfc;

    form {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: auto;

      .btn-add {
        width: 80px;
        margin-left: auto;
        margin-top: 20px;
        text-transform: uppercase;
      }

      .btn-submit {
        margin-top: 30px;
        background-color: #2c3851;
        text-transform: uppercase;
      }

      .btn-submit:hover {
        background-color: #242e42;
      }
    }
  }
`;

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;

  h2 {
    margin-right: auto;
    color: #2f2e41;
    font-size: 20px;
  }

  .text-field {
    margin-left: 20px;
    width: 500px;
  }
`;
