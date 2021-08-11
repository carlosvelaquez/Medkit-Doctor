import React, { useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { LayoutContext } from "../context";

import "./Styles/NotFound.scss";

const NotFound = () => {
  const { t } = useTranslation();
  const { setScreenName } = useContext(LayoutContext);

  useEffect(() => {
    setScreenName(t("Not Found"));
  }, []);

  return <div className="not-found-screen">Not Found</div>;
};

export default NotFound;
