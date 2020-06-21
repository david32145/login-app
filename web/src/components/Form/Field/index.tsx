import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";

import TextField, { TextFieldProps } from "components/TextField";

interface FieldProps extends Omit<Omit<TextFieldProps, "error">, "ref"> {
  fieldName: string;
}

const Field: React.FC<FieldProps> = ({ fieldName: name, ...rest }) => {
  const { error, defaultValue, fieldName, registerField } = useField(name);
  const textFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textFieldRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <TextField
      {...rest}
      ref={textFieldRef}
      defaultValue={defaultValue}
      error={error}
    />
  );
};

export default Field;
