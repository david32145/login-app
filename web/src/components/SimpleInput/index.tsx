import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { useField } from "@unform/core";

const Container = styled.div<{ error?: boolean }>`
  input {
    height: 35px;
    width: 100%;
    padding: 10px;
    color: #8a909e;
    font-size: 14px;
    border-radius: 2px;
    border: ${(props) => (props.error ? "0.5px solid  #FF1C1C" : "none")};
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);

    ::placeholder {
      color: rgba(0, 0, 0, 0.3);
    }
  }
`;

interface SimpleInputProps extends React.HTMLProps<HTMLInputElement> {
  name: string;
}

const SimpleInput: React.FC<SimpleInputProps> = ({
  name,
  className,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { error, defaultValue, fieldName, registerField } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <Container error={!!error} className={className}>
      <input defaultValue={defaultValue} ref={inputRef} type="text" {...rest} />
    </Container>
  );
};

export default SimpleInput;
