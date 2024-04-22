import React, { useEffect } from "react";
import ChatListCard from "./ChatListCard";
import { useDispatch } from "react-redux";
import { setChat, setChats } from "../../Redux/ChatSlice";
import { getAllChats } from "../../utils/APIRequest";

const ChatMembersList = ({ friends, setScreen, sentMessage }) => {
  const dispatch = useDispatch();
  const handleApi = async () => {
    const res = await getAllChats();
    dispatch(setChats(res));
  };
  useEffect(() => {
    handleApi();
  }, [sentMessage]);
  return (
    <>
      <div
        className="bg-zinc-950 text-white w-full rounded-lg shadow-xl p-4 py-3 flex flex-col gap-2 flex-1 overflow-y-scroll"
        style={{ scrollBehavior: "smooth", scrollbarWidth: "none" }}
      >
        {friends?.map((curr, index) => {
          return (
            <div
              className="border-b-[1px] border-zinc-900 pb-[6px]"
              key={index}
              onClick={() => {
                dispatch(setChat(curr));
                setScreen("Right");
              }}
            >
              <ChatListCard friend={curr} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ChatMembersList;
