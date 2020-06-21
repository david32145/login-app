import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Form } from "@unform/web";
import { SubmitHandler, FormHandles } from "@unform/core";

import * as yup from "yup";

import undrawForm from "assets/undraw-desing-form.svg";

import Field from "components/Form/Field";
import Button from "components/Button";

import logo from "assets/logo.png";

import NotificationService from "services/NotificationService";
import LoginService from "services/LoginService";
import { ApiError } from "services/ApiServices";
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
      await LoginService.singIn(data.email, data.password);
      NotificationService.notity("You logged with successful", "SUCCESS", 1000);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        NotificationService.notity("Form have bad fields", "DANGER", 1500);
        const errors = err.inner.reduce<Record<string, string>>(
          (acc, error) => {
            acc[error.path] = error.message;
            return acc;
          },
          {}
        );
        formRef.current?.setErrors(errors);
      }
      if (err instanceof ApiError) {
        NotificationService.notity(err.message, "DANGER", 1500);
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

          <Field
            className="input-text"
            fieldName="email"
            type="text"
            placeholder="jonh@test.com"
            label="Email"
          />
          <Field
            className="input-text"
            fieldName="password"
            placeholder="your password"
            label="Password"
            type="password"
          />

          <Button className="btn-sing-in">Sing In</Button>
          <Link to="/join">Create Account</Link>
        </Form>
        <img className="logo" src={logo} alt="Logo" />
      </main>
    </Container>
  );
};

export default SingInPage;
