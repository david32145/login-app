import React, { useState } from "react";

import { MdKeyboardArrowDown } from "react-icons/md";

import { Container } from "./styles";

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  options: Option[];
}

const Select: React.FC<SelectProps> = ({ options }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<Option>();

  function handleOpenOptions() {
    setOpen((oldOpen) => !oldOpen);
  }

  function handleCloseOptions() {}

  function handleChangeOptions(option: Option) {
    setOpen(false);
    setValue(option);
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
            <li onClick={() => handleChangeOptions(option)}>{option.label}</li>
          ))}
        </ul>
      )}
    </Container>
  );
};

export default Select;
