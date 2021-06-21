import React from "react";
import Input from "../Components/Input";

import background from "../Assets/Screens/Login/background.svg";

import "./Styles/Login.scss";

const Login = () => {
  return (
    <div
      className="login-screen"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="login-form">
        <h1>Iniciar Sesión</h1>
        <Input />
        <Input />
      </div>
    </div>
  );
};

export default Login;
