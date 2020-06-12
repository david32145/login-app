import React from "react";

import undrawForm from "assets/undraw-desing-form.svg";

import TextField from "components/TextField";
import Button from "components/Button";

import logo from "assets/logo.png";

import { Container } from "./styles";

const SingInPage: React.FC = () => {
  return (
    <Container>
      <div className="landing">
        <img src={undrawForm} alt="Undraw Form" />
        <h1>
          Create form for your searches, and manager the forms like a human
        </h1>
      </div>
      <main>
        <form>
          <h2>Sing In</h2>

          <TextField
            className="input-text"
            placeholder="jonh@test.com"
            label="Email"
          />
          <TextField
            className="input-text"
            placeholder="your password"
            label="Password"
            type="password"
          />

          <Button className="btn-sing-in">Sing In</Button>
          <a href="/singup">Create Account</a>
        </form>
        <img className="logo" src={logo} alt="Logo" />
      </main>
    </Container>
  );
};

export default SingInPage;
