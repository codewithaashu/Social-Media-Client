import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import Cookies from "js-cookie";
import Login from "./Pages/Login";
const App = () => {
  const access_token = Cookies.get("access_token");
  const navigate = useNavigate();
  useEffect(() => {
    //if user doesn't have access_token
    if (!access_token) {
      navigate("/login");
      return;
    }
  }, []);
  return access_token ? <Home /> : <Login />;
};

export default App;
