import React from "react";

import { Form } from "@unform/web";

import Menu from "components/Menu";

import SimpleInput from "components/SimpleInput";

import FieldValue from "components/FieldValue";

import { Container, Header } from "./styles";

const FormNewPage: React.FC = () => {
  return (
    <Container>
      <Menu />
      <main>
        <Form onSubmit={console.log}>
          <Header>
            <h2>New Form</h2>
            <SimpleInput name="title" placeholder="title here..." />
            <SimpleInput
              className="text-field"
              name="description"
              placeholder="description here..."
            />
          </Header>
          <FieldValue />
        </Form>
      </main>
    </Container>
  );
};

export default FormNewPage;
