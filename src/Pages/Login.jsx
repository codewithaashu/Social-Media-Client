import React, { useEffect } from "react";
import LoginBox from "../Components/LoginBox";
import AdBox from "../Components/AdBox";

const Login = () => {
  useEffect(() => {
    document.title = "Login | FunBook";
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center bg-black text-white">
        <div className="flex flex-row">
          <LoginBox />
          <AdBox />
        </div>
      </div>
    </>
  );
};

export default Login;
