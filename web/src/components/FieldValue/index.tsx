import React from "react";

import Select from "components/Select";
import Options from "components/Options";

import { FiTrash2, FiArrowDown, FiArrowUp } from "react-icons/fi";

import { FormField } from "./styles";

const typeOptions = [
  {
    label: "Text Field",
    value: "TEXT_FIELD",
  },
  {
    label: "Text Area",
    value: "TEXT_AREA",
  },
  {
    label: "Radio",
    value: "RADIO",
  },
  {
    label: "Checkbox",
    value: "CHECKBOX",
  },
];

const FieldValue: React.FC = () => {
  return (
    <FormField>
      <div className="input-data">
        <input type="text" placeholder="Enter field name here" />
        <textarea rows={3} placeholder="Enter description for this field" />
      </div>
      <div className="field-data">
        <Select options={typeOptions} />
        <Options />
      </div>
      <div className="actions">
        <div className="trash">
          <FiTrash2 size={18} color="#FF1C1C" />
        </div>
        <div className="move">
          <FiArrowUp size={18} />
          <FiArrowDown size={18} />
        </div>
      </div>
    </FormField>
  );
};

export default FieldValue;
