import React, { useEffect, useState } from "react";
import AdImage from "../assests/img.jpeg";
import { ImConnection } from "react-icons/im";
import { CiBookmarkPlus } from "react-icons/ci";
import { IoShareSocial } from "react-icons/io5";
import { useLocation } from "react-router-dom";
const AdBox = () => {
  const location = useLocation();
  const [path, setPath] = useState("/");
  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);
  return (
    <>
      <div
        className={`px-5 py-20 bg-blue ${
          path === "/login" ? "rounded-r-md" : "rounded-l-md"
        } shadow-md w-[360px] hidden md:flex flex-col justify-center items-center gap-10`}
      >
        <div className="flex justify-between">
          <div className="flex flex-col justify-between">
            <div className="bg-white text-gray-900 px-3 py-1 rounded-lg flex items-center gap-1 justify-center w-fit">
              <ImConnection />
              <p className="text-[10px] font-semibold">Connect</p>
            </div>
            <div className="bg-white text-gray-900 px-3 py-1 rounded-lg flex items-center gap-1 justify-center w-fit">
              <CiBookmarkPlus />
              <p className="text-[10px] font-semibold">Bookmark</p>
            </div>
          </div>
          <img
            src={AdImage}
            alt="AdImage"
            className="w-36 rounded-full h-36 object-cover"
          />
          <div className="bg-white text-gray-900 px-3 py-1 rounded-lg flex items-center gap-1 justify-center w-fit h-fit">
            <IoShareSocial />
            <p className="text-[10px] font-semibold">Share</p>
          </div>
        </div>
        <div className="flex flex-col gap-1 justify-center">
          <p className="text-xs font-semibold">
            Connect with friends & have share for fun
          </p>
          <p className="text-[10px] font-semibold text-center">
            Share moments with friends and the work
          </p>
        </div>
      </div>
    </>
  );
};

export default AdBox;
