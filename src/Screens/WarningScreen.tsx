import React from "react";
import { useTranslation } from "react-i18next";

import { Icon } from "@iconify/react";
import alert from "@iconify-icons/mdi/alert";

import "./Styles/WarningScreen.scss";

const WarningScreen = ({ warning, icon = alert, color = "#FDD835" }) => {
  const { t } = useTranslation();
  const { title, message } = warning;

  return (
    <div className="warning-screen">
      <Icon icon={icon} style={{ color }} />
      <h1>{title || t("Something happened")}</h1>
      <p>{message}</p>
    </div>
  );
};

export default WarningScreen;
