import React, { useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
const ChatsRightHeader = ({ setScreen }) => {
  const navigate = useNavigate("");
  //get onlineUsers list
  const { onlineUser } = useSelector((state) => state.chat);
  //get selected chat user  details
  const { firstName, lastName, profileUrl, _id } = useSelector(
    (state) => state?.chat?.chat
  );
  // const [showOptionScreen, setShowOptionScreen] = useState(false);
  return (
    <>
      <div className="w-full bg-zinc-950 text-white rounded-t-lg shadow-xl p-4 py-3 flex flex-col gap-2 border-b-[1px] border-zinc-900">
        <div className="flex justify-between items-center w-full">
          <div className="flex md:hidden flex-row gap-5 text-2xl text-gray-200 ">
            <IoArrowBackCircleOutline
              className="cursor-pointer"
              onClick={() => setScreen("Left")}
            />
          </div>
          <div className="flex flex-row gap-3">
            <div className="relative w-fit">
              <img
                src={profileUrl}
                alt="User"
                className="w-11 h-11 rounded-full object-cover cursor-pointer"
                onClick={() => navigate("/profile/" + _id)}
              />
              <p
                className={`w-[10px] h-[10px] ${
                  onlineUser.some((curr) => curr.userId === _id)
                    ? "bg-green-600"
                    : "bg-gray-500"
                } rounded-full absolute bottom-0 right-0`}
              ></p>
            </div>
            <div className="flex flex-col gap-[1px] text-gray-100">
              <h1
                className="text-[15px] font-semibold cursor-pointer hover:underline"
                onClick={() => navigate("/profile/" + _id)}
              >
                {firstName + " " + lastName}
              </h1>
              <p className="text-xs text-ascent-2 font-semibold">
                {onlineUser.some((curr) => curr.userId === _id)
                  ? "Online"
                  : "Offline"}
              </p>
            </div>
          </div>
          <div className="flex  flex-row gap-5 text-2xl text-gray-200 ">
            <IoInformationCircleOutline
              className="cursor-pointer"
              /*  onClick={() => setShowOptionScreen(!showOptionScreen)} */
            />
          </div>
        </div>
        {/*         {showOptionScreen && (
          <div className="bg-zinc-900 top-12 absolute right-3 flex flex-col gap-3 px-5 pt-3 pb-10 rounded-xl z-30">
            <button className="text-white bg-red-600 p-2 rounded-lg text-sm font-semibold">
              Block User
            </button>
            <button className="bg-black text-white p-2 rounded-lg text-sm font-semibold">
              Delete Chat
            </button>
          </div>
        )} */}
      </div>
    </>
  );
};

export default ChatsRightHeader;
