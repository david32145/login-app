import React, { useEffect, useRef } from "react";

import FieldValue, { FieldValueRef } from "components/FieldValue";

import { useField } from "@unform/core";

interface FieldProps {
  id: string;
  onClose: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

const Field: React.FC<FieldProps> = ({ id, ...rest }) => {
  const fieldRef = useRef<FieldValueRef>(null);
  const { error, fieldName, registerField } = useField(id);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: fieldRef,
      getValue: (ref) => {
        return ref.current.value;
      },
      setValue: (ref, value) => {
        ref.current.setValue(value);
      },
    });
  }, [fieldName, registerField]);

  return <FieldValue ref={fieldRef} error={error} {...rest} />;
};

export default Field;
