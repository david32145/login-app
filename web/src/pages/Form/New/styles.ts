import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100%;

  main {
    display: flex;
    flex: 1;
    padding: 30px 20px;
    background-color: #f7fdfc;

    form {
      width: 100%;
      height: auto;
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
