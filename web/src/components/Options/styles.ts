import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  ul {
    width: 100%;
    margin-top: 10px;
    list-style: none;

    li {
      display: flex;
      width: 100%;
      padding: 5px 10px;
      border-bottom: 1px solid #e5e5e5;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      span {
        color: #8a909e;
        font-size: 12px;
      }
    }
  }

  input {
    border: none;
    margin-top: 10px;
    border-bottom: 2px solid #8a909e;
    width: 100px;
    font-weight: 300;
    padding: 3px;
    color: #8a909e;
    font-size: 14px;

    ::placeholder {
      color: #8a909e;
    }
  }
`;
