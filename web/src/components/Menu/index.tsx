import React, { useState } from "react";

import { FiClipboard, FiFilePlus } from "react-icons/fi";

import { Container } from "./styles";

const items = [
  {
    Icon: <FiClipboard size={20} />,
    title: "Forms",
  },
  {
    Icon: <FiFilePlus size={20} />,
    title: "New form",
  },
];

const Menu: React.FC = () => {
  const [selected, setSelected] = useState(0);

  function handleChangeMenuItem(index: number) {
    setSelected(index);
  }

  return (
    <Container>
      <h1>Form App</h1>
      <div className="line" />

      <ul>
        {items.map((item, index) => (
          <li
            key={item.title}
            className={index === selected ? "selected" : undefined}
          >
            <button type="button" onClick={() => handleChangeMenuItem(index)}>
              {item.Icon}
              <span>{item.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default Menu;
