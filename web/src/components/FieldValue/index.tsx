import React, { useImperativeHandle, useState, forwardRef } from "react";

import Select, { Option } from "components/Select";
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

export interface Field {
  title: string;
  description: string;
  type: string;
  options: string[];
}

export interface FieldValueRef {
  value: Field;
  setValue: (field: Field) => void;
}

interface FieldValueProps {
  onClose: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  error?: string;
}

const FieldValue: React.ForwardRefRenderFunction<
  FieldValueRef,
  FieldValueProps
> = ({ onClose, onMoveUp, onMoveDown, error }, ref) => {
  const [option, setOption] = useState<Option>({
    label: "Choice",
    value: "",
  });
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);

  function handleChangeOption(opt: Option) {
    setOption(opt);
  }

  function handleRemoveOption(opt: string) {
    setOptions(options.filter((opti) => opti !== opt));
  }

  function handleNewOptions(opts: string) {
    setOptions([...options, opts]);
  }

  useImperativeHandle(
    ref,
    () => {
      return {
        value: {
          description,
          options,
          title,
          type: option.value,
        },
        setValue: (field) => {
          setOption(typeOptions.find((opt) => opt.value === field.type)!);
          setDescription(field.description);
          setTitle(field.title);
          setOptions(field.options);
        },
      };
    },
    [option.value, description, title, options]
  );

  return (
    <FormField>
      <div className="input-data">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter field name here"
        />
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description for this field"
        />
        <span className="error">{error}</span>
      </div>
      <div className="field-data">
        <Select
          value={option}
          options={typeOptions}
          onChange={handleChangeOption}
        />
        {["RADIO", "CHECKBOX"].includes(option.value) && (
          <Options
            options={options}
            onNewOptions={handleNewOptions}
            onRemoveOption={handleRemoveOption}
          />
        )}
      </div>
      <div className="actions">
        <div className="trash">
          <FiTrash2 size={18} color="#FF1C1C" onClick={onClose} />
        </div>
        <div className="move">
          <FiArrowUp size={18} onClick={onMoveUp} />
          <FiArrowDown size={18} onClick={onMoveDown} />
        </div>
      </div>
    </FormField>
  );
};

export default forwardRef(FieldValue);
