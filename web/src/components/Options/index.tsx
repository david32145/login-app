import React, { useState } from "react";

import { FiXCircle } from "react-icons/fi";

import { Container } from "./styles";

const Options: React.FC = () => {
  const [options, setOptions] = useState<string[]>([]);
  const [value, setValue] = useState("");

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      setOptions([...options, value]);
      setValue("");
    }
  }

  function handleRemoveOption(opt: string) {
    setOptions(options.filter((option) => option !== opt));
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
