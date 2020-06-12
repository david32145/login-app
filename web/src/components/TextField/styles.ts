import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-size: 12px;
    color: #e5e5e5;
    font-weight: 400;
    letter-spacing: 0.1em;
    margin-bottom: 7px;
  }

  input[type="text"],
  input[type="password"] {
    background: transparent;
    border: none;
    font-size: 14px;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.8);
    padding: 0 5px 7px;

    border-bottom: 2px solid #e5e5e5;
  }
  span {
    display: block;
    font-size: 10px;
    margin: 4px 0px 0px;
    color: #ff1c1c;
  }

  ::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;
