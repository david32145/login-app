import React, { useState } from "react";

import { FiXCircle } from "react-icons/fi";

import { Container } from "./styles";

interface OptionsProps {
  onNewOptions?: (options: string) => void;
  onRemoveOption?: (opt: string) => void;
  options: string[];
}

const Options: React.FC<OptionsProps> = ({
  onNewOptions,
  onRemoveOption,
  options,
}) => {
  const [value, setValue] = useState("");

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      if (onNewOptions) {
        onNewOptions(value);
      }
      setValue("");
    }
  }

  function handleRemoveOption(opt: string) {
    if (onRemoveOption) {
      onRemoveOption(opt);
    }
  }

  return (
    <Container>
      <ul>
        {options.map((option) => (
          <li key={option}>
            <span>{option}</span>
            <FiXCircle
              color="#FF6F6F"
              onClick={() => handleRemoveOption(option)}
            />
          </li>
        ))}
      </ul>

      <input
        onKeyDown={handleKeyDown}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="new item..."
      />
    </Container>
  );
};

export default Options;
