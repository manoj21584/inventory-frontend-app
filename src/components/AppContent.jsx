import { useState } from "react";
import { request, setAuthHeader } from "../helpers/axios_helper";
import Buttons from "./Buttons";
import AuthContent from "./AuthContent";
import LoginForm from "./LoginForm";
import WelcomeContent from "./WelcomeContent";

const AppContent = () => {
  const [componentToShow, setComponentToShow] = useState("welcome");

  const login = () => {
    setComponentToShow("login");
  };

  const logout = () => {
    setComponentToShow("welcome");
    setAuthHeader(null);
  };

  const onLogin = async (e, username, password) => {
    e.preventDefault();
    try {
      const response = await request("POST", "/login", {
        login: username,
        password,
      });
      setAuthHeader(response.data.token);
      setComponentToShow("messages");
    } catch (error) {
      setAuthHeader(null);
      setComponentToShow("welcome");
    }
  };

  const onRegister = async (event, firstName, lastName, username, password) => {
    event.preventDefault();
    try {
      const response = await request("POST", "/register", {
        firstName,
        lastName,
        login: username,
        password,
      });
      setAuthHeader(response.data.token);
      setComponentToShow("messages");
    } catch (error) {
      setAuthHeader(null);
      setComponentToShow("welcome");
    }
  };

  return (
    <>
      <Buttons login={login} logout={logout} />
      {componentToShow === "welcome" && <WelcomeContent />}
      {componentToShow === "login" && (
        <LoginForm onLogin={onLogin} onRegister={onRegister} />
      )}
      {componentToShow === "messages" && <AuthContent />}
    </>
  );
};

export default AppContent;
