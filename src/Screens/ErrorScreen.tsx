import React from "react";
import { useTranslation } from "react-i18next";

import { Icon } from "@iconify/react";
import alertCircle from "@iconify-icons/mdi/alert-circle";

import "./Styles/ErrorScreen.scss";

const ErrorScreen = ({ error }) => {
  const { t } = useTranslation();

  return (
    <div className="error-screen">
      <Icon icon={alertCircle} />
      <h1>{t("Error occurred")}</h1>
      <p>{t(error.message)}</p>
    </div>
  );
};

export default ErrorScreen;
