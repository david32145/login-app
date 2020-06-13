import styled from "styled-components";

export const Container = styled.menu`
  width: 300px;
  height: 100%;

  background-color: #2c3851;

  padding: 25px 20px;

  h1 {
    color: #ffffff;
    font-size: 18px;
  }

  .line {
    border-top: 1px solid #8a909e;
    margin: 30px 0;
  }

  ul {
    list-style: none;

    li {
      margin-bottom: 10px;
      border-radius: 4px;
      overflow: hidden;
    }

    li button:hover {
      background-color: rgba(255, 255, 255, 0.05);
      cursor: pointer;
    }

    li button {
      padding: 0 20px;
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 40px;
      width: 100%;
      background: transparent;
      border: none;

      svg,
      span {
        color: #8a909e;
      }
    }

    li button span {
      color: #8a909e;
      font-weight: 400px;
      font-size: 14px;
      margin-left: 10px;
    }

    .selected {
      background-color: rgba(255, 255, 255, 0.15);

      svg,
      span {
        color: #fca311;
      }
    }

    .selected:hover {
      background-color: rgba(255, 255, 255, 0.15);
    }
  }
`;
