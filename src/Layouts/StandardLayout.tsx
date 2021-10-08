import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
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

type NavLinkProps = {
  to: string;
  text: string;
  icon: object;
  exact?: boolean;
  callback: () => void;
};

const NavLink = ({ to, text, icon, exact = false, callback }: NavLinkProps) => {
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
      <div className="decoration" />
      <Icon icon={icon} />
      <div className="text">{text}</div>
    </DivButton>
  );
};

type NavigatorProps = {
  visible: boolean;
  hideNavigator: (noDelay?: boolean) => void;
};

const Navigator = ({ visible = false, hideNavigator }: NavigatorProps) => {
  const { t } = useTranslation();

  const user = useContext(UserContext);
  const visibleClass = visible ? "visible" : "";

  return (
    <>
      <DivButton
        className={`navigator-overlay ${visibleClass}`}
        action={() => hideNavigator(true)}
      />
      <div id="navigator">
        <DivButton className="back-button" action={() => hideNavigator(true)}>
          <Icon icon={arrowLeft} />
        </DivButton>
        <NavLink
          text={t("Dashboard")}
          icon={viewDashboard}
          to="/"
          exact
          callback={() => hideNavigator()}
        />
        <div className="separator" />
        <NavLink
          text={t("Patients")}
          icon={accountIcon}
          to={`/patients`}
          // to="/patients"
          callback={() => hideNavigator()}
        />
        <NavLink
          text={t("Appointments")}
          icon={calendarIcon}
          to="/appointments"
          callback={() => hideNavigator()}
        />
        <NavLink
          text={t("Accounting")}
          icon={financeIcon}
          to="/accounting"
          callback={() => hideNavigator()}
        />
        <div className="separator" />
        <NavLink
          text={t("Institution")}
          icon={hospitalBox}
          to="/institution"
          callback={() => hideNavigator()}
        />
        <NavLink
          text={t("System Settings")}
          icon={cogIcon}
          to="/settings"
          callback={() => hideNavigator()}
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

type StandardLayoutProps = {
  children: any;
};

const StandardLayout = ({ children }: StandardLayoutProps) => {
  const { t } = useTranslation();

  const [navState, setNavState] = useState("hidden");
  const [screenName, setScreenName] = useState("Screen Name");
  const [padding, setPadding] = useState(true);
  const [cardScroll, setCardScroll] = useState<number | undefined>(0);

  const contentContainerRef = useRef<HTMLDivElement>(null);

  const user = useContext(UserContext);
  const location = useLocation();

  const navVisible = navState === "shown";

  const hideNavigator = useCallback(
    (noDelay = false) => {
      console.log("hiding nav");

      if (noDelay) setNavState("hidden");
      else setNavState("delayedHidden");
    },
    [setNavState]
  );

  useEffect(() => {
    if (navVisible)
      document.querySelectorAll(".navlink")?.forEach((element, index) => {
        element.animate(
          [
            {
              opacity: 0,
              left: "-50px",
            },
            {
              opacity: 1,
              left: "0px",
            },
          ],
          {
            duration: 500,
            fill: "both",
            easing: "cubic-bezier(0.25, 1, 0.5, 1)",
            delay: index * 25,
          }
        );
      });

    const showKeyframes = [
      { transform: "translateX(0px)" },
      { transform: "translateX(250px)" },
    ];

    const hideKeyframes = [
      { transform: "translateX(250px)" },
      { transform: "translateX(0px)" },
    ];

    const timing: KeyframeAnimationOptions = {
      duration: 300,
      easing: "cubic-bezier(0.33, 1, 0.68, 1)",
      delay: navState === "delayedHidden" ? 150 : 0,
      fill: "both",
    };

    document
      .getElementById("navigator")
      ?.animate(navVisible ? showKeyframes : hideKeyframes, timing);

    document
      .getElementById("page-container")
      ?.animate(navVisible ? showKeyframes : hideKeyframes, timing);
  }, [navState]);

  const calcCardOpacity = useCallback((currScroll) => {
    if (currScroll <= 0) return "1px";
    if (currScroll >= 50) return "2px";

    return `${1 - currScroll / 50}px`;
  }, []);

  if (!user)
    // if (false)
    // TODO: Validate user
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { referrer: location },
        }}
      />
    );

  return (
    <LayoutContext.Provider value={{ setScreenName, setPadding }}>
      <div className="standard-layout-container">
        <Navigator visible={navVisible} hideNavigator={hideNavigator} />

        <div id="page-container" className={`${padding ? "padded" : ""}`}>
          <DivButton
            className={`menu-button`}
            action={() => setNavState("shown")}
          >
            <Icon icon={menuIcon} />
            {t(screenName)}
          </DivButton>

          <div
            className="content-container"
            ref={contentContainerRef}
            // onScroll={() => {
            //   console.log(contentContainerRef.current?.style.opacity);

            //   if (contentContainerRef.current)
            //     contentContainerRef.current.style.opacity = calcCardOpacity(
            //       contentContainerRef.current?.scrollTop
            //     );
            // }}
          >
            <div className="card-background">{children}</div>
          </div>
        </div>
      </div>
    </LayoutContext.Provider>
  );
};

export default StandardLayout;
