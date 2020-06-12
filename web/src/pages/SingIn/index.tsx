import React, { useRef } from "react";
import { Form } from "@unform/web";
import { SubmitHandler, FormHandles } from "@unform/core";

import undrawForm from "assets/undraw-desing-form.svg";

import TextField from "components/TextField";
import Button from "components/Button";

import logo from "assets/logo.png";

import { Container } from "./styles";

interface FormSingIn {
  email: string;
  password: string;
}

const SingInPage: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const handlerSingIn: SubmitHandler<FormSingIn> = (data) => {
    console.log(data);
  };

  return (
    <Container>
      <div className="landing">
        <img src={undrawForm} alt="Undraw Form" />
        <h1>
          Create form for your searches, and manager the forms like a human
        </h1>
      </div>
      <main>
        <Form onSubmit={handlerSingIn} ref={formRef}>
          <h2>Sing In</h2>

          <TextField
            className="input-text"
            name="email"
            placeholder="jonh@test.com"
            label="Email"
          />
          <TextField
            className="input-text"
            name="password"
            placeholder="your password"
            label="Password"
            type="password"
          />

          <Button className="btn-sing-in">Sing In</Button>
          <a href="/singup">Create Account</a>
        </Form>
        <img className="logo" src={logo} alt="Logo" />
      </main>
    </Container>
  );
};

export default SingInPage;
