import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const BtnComponent = ({ label, handleBtn, active, loading }) => {
  const location = useLocation();
  const [path, setPath] = useState("/");
  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);
  return (
    <button
      className={`text-sm font-semibold flex justify-center disabled:bg-slate-800 bg-blue w-full p-2 rounded-md ${
        path === "/forgot-password" || path.includes("/reset-password/")
          ? "mt-1"
          : "mt-7"
      }`}
      disabled={active ? "" : "disabled"}
      onClick={handleBtn}
    >
      {loading ? <div className="loader"></div> : label}
    </button>
  );
};

export default BtnComponent;
