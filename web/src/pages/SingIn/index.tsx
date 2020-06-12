import React, { useRef } from "react";
import { Form } from "@unform/web";
import { SubmitHandler, FormHandles } from "@unform/core";

import * as yup from "yup";

import undrawForm from "assets/undraw-desing-form.svg";

import TextField from "components/TextField";
import Button from "components/Button";

import logo from "assets/logo.png";

import { Container } from "./styles";

interface FormSingIn {
  email: string;
  password: string;
}

const SingInValidator = yup.object().shape({
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup
    .string()
    .min(7, "Password must at be at least 7 letters")
    .max(30, "Password must at maximum of 30 letters")
    .required("Password is required"),
});

const SingInPage: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const handlerSingIn: SubmitHandler<FormSingIn> = async (data) => {
    try {
      await SingInValidator.validate(data, {
        abortEarly: false,
      });
      formRef.current?.setErrors({});
      console.log(data);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors = err.inner.reduce<Record<string, string>>(
          (acc, error) => {
            acc[error.path] = error.message;
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
