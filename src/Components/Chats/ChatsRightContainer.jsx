import React from "react";
import ChatsRightHeader from "./ChatsRightHeader";
import ChatBox from "./ChatBox";
import { useSelector } from "react-redux";

const ChatsRightContainer = ({
  setSentMessage,
  recievedMessage,
  screen,
  setScreen,
}) => {
  const { chat } = useSelector((state) => state.chat);
  return (
    <>
      <div
        className={`md:w-3/4 w-full ${
          screen === "Right" ? "block" : "hidden"
        } md:block relative`}
      >
        {chat ? (
          <>
            <ChatsRightHeader setScreen={setScreen} />
            <ChatBox
              setSentMessage={setSentMessage}
              recievedMessage={recievedMessage}
            />
          </>
        ) : (
          <div className="bg-zinc-950 w-full h-[85vh] rounded-md flex justify-center items-center">
            <div className="text-xl font-semibold text-gray-300">
              Select a friend or start a new chat
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatsRightContainer;
