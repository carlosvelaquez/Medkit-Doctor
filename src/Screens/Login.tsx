import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-bootstrap";
import { useLocation, useHistory } from "react-router-dom";

import emailOutline from "@iconify-icons/mdi/email-outline";
import formTextboxPassword from "@iconify-icons/mdi/form-textbox-password";

import { UserContext } from "../context";

import { Input } from "../Components/Input";
import {
  GoogleLoginButton,
  FacebookLoginButton,
} from "../Components/SocialLoginButtons";

import background from "../Assets/Screens/Login/background-secondary.svg";

import "./Styles/Login.scss";
import DivButton from "../Components/DivButton";

const Login = () => {
  const location = useLocation<{
    referrer: string
  }>();

  const history = useHistory();

  const user = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState(null);

  const { t } = useTranslation();

  if (user) {
    if (location.state && location.state.referrer) {
      history.push(location.state.referrer);
    } else {
      history.push("/dashboard");
    }
  }

  const signIn = async () => {
    setError(null);
    setEmailError(false);
    setPasswordError(false);

    if (email === "") {
      setError(t("Enter email warning"));
      setEmailError(true);

      return;
    }

    if (password === "") {
      setError(t("Enter password warning"));
      setPasswordError(true);

      return;
    }
  };

  return (
    <div
      className="login-screen"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="login-form-container">
        <div className="login-form">
          <h1>{t("Login Title")}</h1>
          <div className="social-login-container">
            <GoogleLoginButton action={() => console.log("OLO")}/>
            <div className="social-login-spacer" />
            <FacebookLoginButton action={() => console.log("OLO")}/>
          </div>
          <div className="login-form-spacer">
            <p>{t("Use Login Credentials")}</p>
          </div>
          <div className="credentials-login">
            <div className="credentials-login-inputs">
              <Input
                icon={emailOutline}
                placeholder={t("Email")}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                action={signIn}
                error={emailError}
              />
              <Input
                icon={formTextboxPassword}
                placeholder={t("Password")}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                action={signIn}
                error={passwordError}
              />
            </div>
            <div className="credentials-login-spacer" />
            <DivButton className="credentials-login-button" action={signIn}>
              {t("Login Title")}
            </DivButton>
          </div>
          {error ? (
            <Alert className="credentials-login-alert" variant="danger">
              {error}
            </Alert>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
