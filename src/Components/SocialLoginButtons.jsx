import React from "react";
import { useTranslation } from "react-i18next";

import DivButton from "./DivButton";

import GoogleLogo from "../Assets/Components/SocialLoginButtons/GoogleLogo.png";
import FacebookLogo from "../Assets/Components/SocialLoginButtons/FacebookLogo.png";
import "./Styles/SocialLoginButtons.scss";

export const GoogleLoginButton = ({ action }) => {
  const { t } = useTranslation();

  return (
    <DivButton action={action} className="SocialLoginButton GoogleLoginButton">
      <img
        className="SocialLoginButtonLogo"
        alt="GoogleLogo"
        src={GoogleLogo}
      />
      <div className="SocialLoginButtonText">{t("Google Login")}</div>
    </DivButton>
  );
};

export const FacebookLoginButton = ({ action }) => {
  const { t } = useTranslation();

  return (
    <DivButton
      action={action}
      className="SocialLoginButton FacebookLoginButton"
    >
      <img
        className="SocialLoginButtonLogo"
        alt="FacebookLogo"
        src={FacebookLogo}
      />
      <div className="SocialLoginButtonText">{t("Facebook Login")}</div>
    </DivButton>
  );
};
