import React, { useState, useRef } from "react";
import crypto from "crypto";

import { Form } from "@unform/web";
import { SubmitHandler, FormHandles } from "@unform/core";

import Menu from "components/Menu";
import Button from "components/Button";

import SimpleInput from "components/SimpleInput";

import { Field as FieldModel } from "components/FieldValue";

import Field from "components/Field";

import FormService from "services/FormService";
import { Container, Header } from "./styles";

interface BaseFormSubmit {
  title: string;
  description: string;
}

type FormSubmit = BaseFormSubmit & Record<string, FieldModel>;

const FormNewPage: React.FC = () => {
  const [fields, setFields] = useState<string[]>([
    crypto.randomBytes(8).toString("utf-8"),
  ]);

  const formRef = useRef<FormHandles>(null);

  function handleRemoveField(fieldId: string) {
    const newFields = fields.filter((filter) => filter !== fieldId);
    setFields(newFields);
  }

  function handleAddNewField() {
    setFields([...fields, crypto.randomBytes(8).toString("utf-8")]);
  }

  const handleSubmit: SubmitHandler<FormSubmit> = async (data) => {
    const { title, description, ...rest } = data;
    const fieldsMap = Object.values(rest).map((value) => ({
      label: value.title,
      type: value.type,
      options: value.options,
    }));

    await FormService.add(title, description, "#2c3851", fieldsMap);
  };

  return (
    <Container>
      <Menu />
      <main>
        <Form
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <Header>
            <h2>New Form</h2>
            <SimpleInput name="title" placeholder="title here..." />
            <SimpleInput
              className="text-field"
              name="description"
              placeholder="description here..."
            />
          </Header>
          {fields.map((field) => (
            <Field
              id={field}
              key={field}
              onClose={() => handleRemoveField(field)}
              onMoveDown={() => {}}
              onMoveUp={() => {}}
            />
          ))}
          <Button onClick={handleAddNewField} className="btn-add" type="button">
            Add
          </Button>
          <Button className="btn-submit" type="submit">
            Save
          </Button>
        </Form>
      </main>
    </Container>
  );
};

export default FormNewPage;
