import styled, { keyframes } from "styled-components";

const rotate = keyframes`
 from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: #ffffff;

  display: flex;
  align-items: center;
  justify-content: center;

  .loader {
    width: 40px;
    height: 40px;
    border-top: 5px solid #2c3851;
    animation: ${rotate} 0.3s linear infinite;
  }
`;
