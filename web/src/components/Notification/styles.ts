import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  padding: 20px;
  right: 0;
  top: 0;

  ul {
    list-style: none;
  }

  .notification {
    height: 42px;
    padding: 10px 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    animation: fade 0.3s linear;

    margin-bottom: 15px;

    background-color: #ffffff;
    border-radius: 2px;

    box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);

    p {
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
      font-weight: 400;
      margin-left: 10px;
    }
  }

  @keyframes fade {
    from {
      opacity: 0;
      transform: translateY(-50px);
    }

    to {
      opacity: 1;
      transform: translateY(0) px;
    }
  }
`;
