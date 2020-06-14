import React, { useState } from "react";

import { MdKeyboardArrowDown } from "react-icons/md";

import { Container } from "./styles";

export interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  options: Option[];
  value: Option;
  onChange?: (option: Option) => void;
}

const Select: React.FC<SelectProps> = ({ options, value, onChange }) => {
  const [open, setOpen] = useState(false);

  function handleOpenOptions() {
    setOpen((oldOpen) => !oldOpen);
  }

  function handleCloseOptions() {}

  function handleChangeOptions(option: Option) {
    setOpen(false);
    if (onChange) {
      onChange(option);
    }
  }

  return (
    <Container>
      <button
        type="button"
        onClick={handleOpenOptions}
        onBlur={handleCloseOptions}
      >
        {value?.label || "Choice"}
        <MdKeyboardArrowDown color="#8A909E" size={30} />
      </button>
      {open && (
        <ul>
          {options.map((option) => (
            <li key={option.value} onClick={() => handleChangeOptions(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
};

export default Select;
