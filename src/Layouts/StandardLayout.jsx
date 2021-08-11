import React, { useContext, useState, useEffect } from "react";
import { useLocation, useHistory, Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Icon } from "@iconify/react";
import viewDashboard from "@iconify-icons/mdi/view-dashboard";
import accountIcon from "@iconify-icons/mdi/account";
import calendarIcon from "@iconify-icons/mdi/calendar";
import cogIcon from "@iconify-icons/mdi/cog";
import financeIcon from "@iconify-icons/mdi/finance";
import hospitalBox from "@iconify-icons/mdi/hospital-box";
import menuIcon from "@iconify-icons/mdi/menu";
import arrowLeft from "@iconify-icons/mdi/arrow-left";
import logoutVariant from "@iconify-icons/mdi/logout-variant";

import { UserContext, LayoutContext } from "../context";
import DivButton from "../Components/DivButton";

import "./Styles/StandardLayout.scss";

const NavLink = ({ to, text, icon, exact = false, callback }) => {
  const location = useLocation();
  const history = useHistory();

  const selected = exact
    ? location.pathname === to
    : location.pathname.includes(to);

  return (
    <DivButton
      action={() => {
        history.push(to);
        callback && callback();
      }}
      className={`navlink${selected ? " selected" : ""}`}
    >
      <div className="navlink-decoration" />
      <Icon icon={icon} />
      <div className="navlink-text">{text}</div>
    </DivButton>
  );
};

const Navigator = ({ visible = false, delay, setVisible }) => {
  const { t } = useTranslation();

  const user = useContext(UserContext);
  const visibleClass = visible ? "visible" : "";

  return (
    <>
      <DivButton
        className={`navigator-overlay ${visibleClass}`}
        action={() => setVisible(false, false)}
      />
      <div className={`navigator ${visibleClass} ${!delay ? "no-delay" : ""}`}>
        <DivButton
          className="back-button"
          action={() => setVisible(false, false)}
        >
          <Icon icon={arrowLeft} />
        </DivButton>
        <NavLink
          text={t("Dashboard")}
          icon={viewDashboard}
          to="/"
          exact
          callback={() => setVisible(false)}
        />
        <div className="nav-separator" />
        <NavLink
          text={t("Patients")}
          icon={accountIcon}
          to={`/patients/60da04a66b99db53b41ea167`}
          // to="/patients"
          callback={() => setVisible(false)}
        />
        <NavLink
          text={t("Appointments")}
          icon={calendarIcon}
          to="/appointments"
          callback={() => setVisible(false)}
        />
        <NavLink
          text={t("Accounting")}
          icon={financeIcon}
          to="/accounting"
          callback={() => setVisible(false)}
        />
        <div className="nav-separator" />
        <NavLink
          text={t("Institution")}
          icon={hospitalBox}
          to="/institution"
          callback={() => setVisible(false)}
        />
        <NavLink
          text={t("System Settings")}
          icon={cogIcon}
          to="/settings"
          callback={() => setVisible(false)}
        />
        <div style={{ flex: "1" }} />
        <DivButton className="navlink" action={() => user.logOut()}>
          <Icon icon={logoutVariant} />
          {t("Log Out")}
        </DivButton>
      </div>
    </>
  );
};

const StandardLayout = ({ children }) => {
  const { t } = useTranslation();

  const [navVisible, setNavVisible] = useState(false);
  const [delay, setDelay] = useState(true);
  const [screenName, setScreenName] = useState("Screen Name");
  const [menuPos, setMenuPos] = useState(0);
  const [lastPos, setLastPos] = useState(0);

  const user = useContext(UserContext);
  const location = useLocation();

  if (!user)
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { referrer: location },
        }}
      />
    );

  return (
    // <div className="standard-layout-container">
    //   <Navigator />
    //   <div className="page-content">{children}</div>
    // </div>
    <LayoutContext.Provider value={{ setScreenName }}>
      <div className="standard-layout-container">
        <Navigator
          visible={navVisible}
          delay={delay}
          setVisible={(vis, dly = true) => {
            setNavVisible(vis);
            setDelay(dly);
          }}
        />

        <div
          className={`page-content ${navVisible ? "offset" : ""} ${
            !delay ? "no-delay" : ""
          }`}
          // onScroll={(e) => {
          //   const nPos = e.target.scrollTop;
          //   setLastPos((lPos) => {
          //     // scroll down
          //     if (nPos > lPos) {
          //       setMenuPos(Math.max(-70, menuPos - (nPos - lPos)));
          //     } else if (lPos > nPos) {
          //       // scroll up
          //       setMenuPos(Math.min(0, menuPos + (lPos - nPos)));
          //     }

          //     return nPos;
          //   });
          // }}
        >
          <DivButton
            className={`menu-button ${navVisible ? "offset" : ""} ${
              !delay ? "no-delay" : ""
            }`}
            style={{ marginTop: menuPos }}
            action={() => setNavVisible(true)}
          >
            <Icon icon={menuIcon} />
            {t(screenName)}
          </DivButton>

          {children}
        </div>
      </div>
    </LayoutContext.Provider>
  );
};

export default StandardLayout;
