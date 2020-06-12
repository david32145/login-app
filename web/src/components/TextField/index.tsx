import React, { useRef } from "react";

import { Container } from "./styles";

interface TextFieldProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
}

const TextField: React.FC<TextFieldProps> = ({
  className,
  label,
  onFocus,
  onBlur,
  ...rest
}) => {
  const labelRef = useRef<HTMLLabelElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const x = false;

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
        ref={inputRef}
        type="text"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
      />
      {x && <span>Error</span>}
    </Container>
  );
};

export default TextField;
