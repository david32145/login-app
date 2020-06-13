import styled from "styled-components";

export const Container = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  width: 100%;
  position: relative;

  button {
    display: flex;
    width: 100%;
    height: 40px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: transparent;
    border: none;

    font-weight: 300;
    color: #8a909e;
    font-size: 15px;
    padding: 0 5px 0 8px;
  }
  ul {
    display: flex;
    position: absolute;
    top: 40px;
    left: 0;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    list-style: none;
    right: 0;
    background: #ffffff;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);

    li {
      display: flex;
      width: 100%;
      cursor: pointer;
      color: #2f2e41;
      flex-direction: row;
      align-items: center;
      padding: 0 8px;
      height: 40px;
    }

    li:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;
