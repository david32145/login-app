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
import { ApiError } from "services/ApiServices";
import NotificationService from "services/NotificationService";
import * as yup from "yup";
import { Container, Header } from "./styles";

const FormSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, "The form title must have at least 3 letters")
    .max(30, "The form title must have a maximum of 30 letter")
    .required("The form title is required"),
  description: yup
    .string()
    .min(5, "The form description must have at least 5 letters")
    .max(100, "The form description must have a maximum of 100 letter")
    .required("The form description is required"),
  theme: yup.string().required("The theme is required"),
  fields: yup
    .array()
    .of(
      yup.object().shape({
        label: yup.string().required("You must provide an title"),
        type: yup
          .string()
          .oneOf(
            ["TEXT_FIELD", "TEXT_AREA", "CHECKBOX", "RADIO"],
            "You must select an field type"
          )
          .required("You must select an field type"),
        description: yup.string(),
        options: yup
          .array()
          .of(yup.string())
          .test("is_options_valid", "Insert least one option", function test(
            value
          ) {
            const { type } = this.parent;
            if (type === "CHECKBOX" || type === "RADIO") {
              return value.length > 0;
            }

            return true;
          }),
      })
    )
    .required("You must provide least at one field")
    .min(1, "The form must have at least 1 question"),
});

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
      description: value.description,
    }));
    try {
      await FormSchema.validate(
        { title, description, fields: fieldsMap, theme: "#2c3851" },
        {
          abortEarly: false,
        }
      );
      await FormService.add(title, description, "#2c3851", fieldsMap);
      formRef.current?.setErrors({});
      NotificationService.notity("You have an new form.", "INFO", 2000);
    } catch (err) {
      if (err instanceof ApiError) {
        NotificationService.notity(err.message, "DANGER", 3000);
      }

      if (err instanceof yup.ValidationError) {
        NotificationService.notity("Form have bad fields", "DANGER");
        const errors = err.inner.reduce<Record<string, string>>(
          (acc, error) => {
            const exec = /^fields\[(\d+)\]/.exec(error.path);
            if (exec) {
              const index = Number(exec[1]);
              const key_id = fields[index];
              acc[key_id] = error.message;
            } else {
              acc[error.path] = error.message;
            }
            return acc;
          },
          {}
        );
        formRef.current?.setErrors(errors);
      }
    }
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
