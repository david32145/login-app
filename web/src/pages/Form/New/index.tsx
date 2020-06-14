import React, { useState } from "react";
import crypto from "crypto";

import { Form } from "@unform/web";

import Menu from "components/Menu";
import Button from "components/Button";

import SimpleInput from "components/SimpleInput";

import Field from "components/Field";

import { Container, Header } from "./styles";

const FormNewPage: React.FC = () => {
  const [fields, setFields] = useState<string[]>([
    crypto.randomBytes(8).toString("utf-8"),
  ]);

  function handleRemoveField(fieldId: string) {
    console.log(fields);
    const newFields = fields.filter((filter) => filter !== fieldId);
    console.log(newFields);
    setFields(newFields);
  }

  function handleAddNewField() {
    setFields([...fields, crypto.randomBytes(8).toString("utf-8")]);
  }

  return (
    <Container>
      <Menu />
      <main>
        <Form
          onSubmit={(d) => {
            console.log(d);
          }}
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
