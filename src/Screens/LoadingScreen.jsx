import React from "react";
import { Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import "./Styles/LoadingScreen.scss";

const LoadingScreen = ({ error }) => {
  const { t } = useTranslation();

  return (
    <div className="loading-screen screen">
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default LoadingScreen;
