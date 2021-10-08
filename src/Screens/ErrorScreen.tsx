import React from "react";
import { useTranslation } from "react-i18next";

import { Icon } from "@iconify/react";

import alertCircle from "@iconify-icons/mdi/alert-circle";
import alert from "@iconify-icons/mdi/alert";


import "./Styles/ErrorScreen.scss";

type ErrorScreenProps = {
  error: Error,
  type?: "warning" | "error",
}

const ErrorScreen = ({ error, type = "error" } : ErrorScreenProps) => {
  const { t } = useTranslation();

  let color : string;
  let icon : object;

  switch (type) {
    case "warning": {
      color = "#FFD54F";
      icon = alert;
      break;
    }

    default: {
      color = "#E57373";
      icon = alertCircle;
    }
  }

  return (
    <div className="error-screen">
      <Icon icon={icon} style={{color}} />
      <h1>{t("Error occurred")}</h1>
      <p>{t(error.message)}</p>
    </div>
  );
};

export default ErrorScreen;
