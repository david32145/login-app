import React, { useRef, forwardRef } from "react";

import { Container } from "./styles";

export interface TextFieldProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
  error?: string;
}

const TextField: React.ForwardRefRenderFunction<
  HTMLInputElement,
  TextFieldProps
> = ({ label, error, className, onFocus, onBlur, ...rest }, ref) => {
  const divRef = useRef<HTMLDivElement>(null);

  function handleInputFocus(event: React.FocusEvent<HTMLInputElement>) {
    if (onFocus) {
      onFocus(event);
    }
    divRef.current?.classList.add("active");
  }

  function handleInputBlur(event: React.FocusEvent<HTMLInputElement>) {
    if (onBlur) {
      onBlur(event);
    }
    divRef.current?.classList.remove("active");
  }

  return (
    <Container className={className}>
      <div ref={divRef}>
        <label>{label}</label>
        <input
          {...rest}
          ref={ref}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        {error && <span>{error}</span>}
      </div>
    </Container>
  );
};

export default forwardRef(TextField);
