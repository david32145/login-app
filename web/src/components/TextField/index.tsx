import React, { useRef, useEffect } from "react";
import { useField } from "@unform/core";

import { Container } from "./styles";

interface TextFieldProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
  name: string;
}

const TextField: React.FC<TextFieldProps> = ({
  className,
  label,
  name,
  onFocus,
  onBlur,
  ...rest
}) => {
  const labelRef = useRef<HTMLLabelElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { error, defaultValue, fieldName, registerField } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  function handleInputFocus(event: React.FocusEvent<HTMLInputElement>) {
    if (onFocus) {
      onFocus(event);
    }
    labelRef.current!.style.color = "#FCA311";
    inputRef.current!.style.color = "#FCA311";
    inputRef.current!.style.borderBottomColor = "#FCA311";
  }

  function handleInputBlur(event: React.FocusEvent<HTMLInputElement>) {
    if (onBlur) {
      onBlur(event);
    }
    labelRef.current!.style.color = "#e5e5e5";
    inputRef.current!.style.color = "#e5e5e5";
    inputRef.current!.style.borderBottomColor = "rgba(255, 255, 255, 0.8)";
  }

  return (
    <Container className={className}>
      <label ref={labelRef}>{label}</label>
      <input
        defaultValue={defaultValue}
        ref={inputRef}
        type="text"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
      />
      {error && <span>{error}</span>}
    </Container>
  );
};

export default TextField;
