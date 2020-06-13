import React from "react";

import { Form } from "@unform/web";

import Menu from "components/Menu";

import SimpleInput from "components/SimpleInput";

import { Container, Header } from "./styles";

const FormNewPage: React.FC = () => {
  return (
    <Container>
      <Menu />
      <main>
        <Form onSubmit={() => {}}>
          <Header>
            <h2>New Form</h2>
            <SimpleInput name="title" placeholder="title here..." />
            <SimpleInput
              className="text-field"
              name="description"
              placeholder="description here..."
            />
          </Header>
        </Form>
      </main>
    </Container>
  );
};

export default FormNewPage;
