import React, { useEffect, useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";
import { BsBriefcase } from "react-icons/bs";
import { confirmAlert } from "react-confirm-alert";
import ConfirmAlertModal from "../ConfirmAlertModal";
import { blockUser, deleteChats } from "../../utils/APIRequest";
import { setChats } from "../../Redux/ChatSlice";
const ChatsRightHeader = ({
  setScreen,
  showOptionScreen,
  setShowOptionScreen,
}) => {
  const navigate = useNavigate("");
  const dispatch = useDispatch();
  //get onlineUsers list
  const { onlineUser } = useSelector((state) => state.chat);
  //get selected chat user  details
  const { firstName, lastName, profileUrl, _id, profession, location } =
    useSelector((state) => state?.chat?.chat);
  //get all chats
  const { chats } = useSelector((state) => state.chat);
  const [chat, setChat] = useState(null);

  useEffect(() => {
    setChat(chats.find((curr) => curr?.members?.includes(_id)));
    return () => {
      setChat(null);
      setShowOptionScreen(false);
    };
  }, [_id, chats]);

  const handleConfirm = async (onClose, type) => {
    if (type === "blockUser") {
      setShowOptionScreen(false);
      onClose();
      const res = await blockUser({
        memberId: _id,
        status: chat?.isBlock ? false : true,
      });
      //after block or unblock, update the chats
      const updatedChats = chats?.map((curr) => {
        if (chats?.find((curr) => curr?.members?.includes(_id))) {
          curr = res;
        }
        return curr;
      });
      dispatch(setChats(updatedChats));
    } else {
      setShowOptionScreen(false);
      onClose();
      const res = await deleteChats(_id);
      if (res) {
        //after delete, update the chats
        dispatch(setChats(res));
      }
    }
  };

  const handleBlockUser = () => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <ConfirmAlertModal
          heading={"Are you sure?"}
          title={`You want to ${
            chat?.isBlock ? "Unblock" : "Block"
          } this user?`}
          handleConfirm={() => handleConfirm(onClose, "blockUser")}
          onClose={onClose}
        />
      ),
    });
  };

  const handleDeleteChat = () => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <ConfirmAlertModal
          heading={"Are you sure?"}
          title={"You want to delete this chat?"}
          handleConfirm={() => handleConfirm(onClose, "deleteChat")}
          onClose={onClose}
        />
      ),
    });
  };

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
                  onlineUser?.some((curr) => curr.userId === _id)
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
                {onlineUser?.some((curr) => curr.userId === _id)
                  ? "Online"
                  : "Offline"}
              </p>
            </div>
          </div>
          <div className="flex  flex-row gap-5 text-2xl text-gray-200 ">
            <IoInformationCircleOutline
              className="cursor-pointer"
              onClick={() => setShowOptionScreen(!showOptionScreen)}
            />
          </div>
        </div>
        {chat && showOptionScreen && (
          <div className="bg-zinc-900 top-12 absolute right-3 flex flex-col p-4 pb-5 rounded-xl z-30 w-40 md:w-48  gap-3 shadow-xl">
            <div className="flex flex-col gap-1 border-b-[1px] border-zinc-800 w-full items-center pb-[6px]">
              <img
                src={profileUrl}
                alt="User Avatar"
                className=" w-16 h-16 md:w-20 md:h-20 rounded-full object-cover cursor-pointer"
                onClick={() => navigate("/profile/" + _id)}
              />
              <div className="flex flex-col gap-[5px] text-center">
                <h1 className="text-base font-semibold leading-5">
                  {firstName + " " + lastName}
                </h1>
                <div className="flex flex-row gap-[3px] items-center text-ascent-2 text-xs font-semibold ">
                  <SlLocationPin />
                  <p>{location ? location : "No Location"}</p>
                </div>
                <div className="flex flex-row gap-[5px] items-center text-ascent-2 text-xs font-semibold">
                  <BsBriefcase />
                  <p>{profession ? profession : "No Profession"}</p>
                </div>
              </div>
            </div>
            <button
              className="text-white bg-blue p-2 rounded-lg text-sm font-semibold w-full"
              onClick={handleBlockUser}
            >
              {chat?.isBlock ? "Unblock" : "Block"} User
            </button>
            <button
              className="bg-black text-white p-2 rounded-lg text-sm font-semibold w-full"
              onClick={handleDeleteChat}
            >
              Delete Chat
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatsRightHeader;
