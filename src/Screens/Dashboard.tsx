import React, { useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { LayoutContext } from "../context";

import "./Styles/Dashboard.scss";

const Dashboard = () => {
  const { t } = useTranslation();
  const { setScreenName } = useContext(LayoutContext);

  useEffect(() => {
    setScreenName(t("Dashboard"));
  }, []);

  return <div className="dashboard-screen screen">Dashboard</div>;
};

export default Dashboard;
