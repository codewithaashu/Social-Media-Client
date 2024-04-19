import React from "react";
import { IoIosSettings } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
const ChatsLeftHeader = ({ setSearchText }) => {
  return (
    <>
      <div className="bg-zinc-950 text-white w-full rounded-lg shadow-xl p-4 py-3 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Chats</h1>
          <IoIosSettings className="text-xl cursor-pointer" />
        </div>
        <div className="flex flex-row border-2 rounded-lg border-zinc-900 w-full items-center p-2 gap-[6px] text-gray-400">
          <IoIosSearch className="text-lg" />
          <input
            type="text"
            placeholder="Search your friend"
            className="text-sm font-medium outline-none  bg-zinc-950 rounded-l-lg placeholder:text-gray-500 text-gray-400 w-full border-0"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default ChatsLeftHeader;
