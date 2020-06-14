import styled from "styled-components";

export const FormField = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
  width: 100%;
  min-height: 20px;

  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.25);
  border-radius: 2px;

  margin-top: 25px;
  padding: 20px;

  .input-data {
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-right: 15px;

    input,
    textarea {
      border: none;
      color: #8a909e;
      font-weight: normal;
      font-size: 16px;

      ::placeholder {
        color: rgba(0, 0, 0, 0.2);
      }
    }

    textarea {
      margin-top: 20px;
      font-size: 14px;
      font-weight: 300;
      color: #2f2e41;
      line-height: 16px;
      height: auto;
      resize: none;
      text-align: justify;
    }

    .error {
      display: block;
      font-size: 13px;
      color: #ff1c1c;
    }
  }

  .field-data {
    width: 300px;
  }

  .actions {
    width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .trash {
      display: flex;
      justify-content: flex-end;
    }

    .move {
      display: flex;
      justify-content: flex-end;

      svg + svg {
        margin-left: 7px;
      }
    }

    svg {
      cursor: pointer;
    }
  }
`;
