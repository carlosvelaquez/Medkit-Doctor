import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Capacitor } from "@capacitor/core";
import { StatusBar, Style } from "@capacitor/status-bar";

import * as Realm from "realm-web";

import RealmApp from "./realm";

import Home from "./Screens/Home";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import Dashboard from "./Screens/Dashboard";
import Patients from "./Screens/Patients";
import Patient from "./Screens/Patient";
import NotFound from "./Screens/NotFound";

import { UserContext } from "./context";

import "./Styles/App.scss";
import StandardLayout from "./Layouts/StandardLayout";

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

const useDarkMode =
  prefersDark.matches ||
  (Capacitor.getPlatform() === "android" &&
    window.navigator.userAgent.includes("AndroidDarkMode"));

const App = () => {
  const [user, setUser] = useState(RealmApp.currentUser);
  const [darkMode, setDarkMode] = useState(useDarkMode);

  const loginAnonymous = async () => {
    console.log("Attempting login");

    // Create an anonymous credential
    const credentials = Realm.Credentials.anonymous();

    try {
      // Authenticate the user
      const user = await RealmApp.logIn(credentials);
      // `App.currentUser` updates to match the logged in user
      if (RealmApp.currentUser && user.id === RealmApp.currentUser.id) setUser(user);
    } catch (err) {
      console.error("Failed to log in", err);
    }
  };

  const setStatusbarStyle = async () => {
    await StatusBar.setStyle({ style: Style.Light });
    await StatusBar.setBackgroundColor({ color: "#f1f9fa" });
  };

  useEffect(() => {
    prefersDark.addListener((mediaQuery) => setDarkMode(mediaQuery.matches));
    loginAnonymous();

    if (Capacitor.isPluginAvailable("StatusBar")) setStatusbarStyle();
  }, []);

  console.log("user", user);

  return (
    <UserContext.Provider value={user}>
      <div className={`App ${darkMode ? "dark" : "light"}`}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />

            <StandardLayout>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/patients/" component={Patients} />
              <Route exact path="/patients/:patientId" component={Patient} />
              {/* <Route path="/" component={NotFound} /> */}
            </StandardLayout>
          </Switch>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
};

export default App;
