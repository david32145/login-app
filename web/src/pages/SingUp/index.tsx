import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Form } from "@unform/web";
import { SubmitHandler, FormHandles } from "@unform/core";

import * as yup from "yup";

import undrawForm from "assets/undraw-desing-form.svg";

import Button from "components/Button";

import Field from "components/Form/Field";

import logo from "assets/logo.png";

import UserService from "services/UserService";
import { ApiError } from "services/ApiServices";
import NotificationService from "services/NotificationService";
import { Container } from "./styles";

interface FormSingIn {
  name: string;
  bio: string;
  email: string;
  password: string;
}

const SingInValidator = yup.object().shape({
  name: yup
    .string()
    .min(3, "Name must at be at least 7 letters")
    .max(30, "Name must at maximum of 30 letters")
    .required("The name is required"),
  bio: yup
    .string()
    .min(5, "Bio must at be at least 5 letters")
    .max(100, "Bio must at maximum of 100 letters")
    .required("The bio is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup
    .string()
    .min(7, "Password must at be at least 7 letters")
    .max(15, "Password must at maximum of 15 letters")
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
      await UserService.singUp(data.name, data.bio, data.email, data.password);
      NotificationService.notity("User was created", "SUCCESS", 1000);
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
          <h2>Join to Form App</h2>

          <Field
            className="input-text"
            fieldName="name"
            type="text"
            placeholder="john"
            label="Name"
          />

          <Field
            className="input-text"
            fieldName="bio"
            type="text"
            placeholder="An design of UI/UX"
            label="Bio"
          />

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
            type="password"
            placeholder="your password"
            label="Password"
          />

          <Button className="btn-sing-in">Sing Up</Button>
          <span className="link">
            Already registered?
            <Link to="/sign"> Sign in</Link>
          </span>
        </Form>
        <img className="logo" src={logo} alt="Logo" />
      </main>
    </Container>
  );
};

export default SingInPage;
