import React, { useEffect, useState } from "react";
import ChatsLeftHeader from "./ChatsLeftHeader";
import ChatMembersList from "./ChatMembersList";
import { useSelector } from "react-redux";

const ChatsLeftContainer = ({ screen, setScreen, sentMessage }) => {
  //get user friends
  const { loginUser } = useSelector((state) => state?.user);
  //set friends as chat member list
  const [friends, setFriends] = useState(loginUser?.friends);
  const [searchText, setSearchText] = useState("");

  //searching functionality
  useEffect(() => {
    if (searchText === "") {
      setFriends(loginUser?.friends);
    } else {
      setFriends(
        loginUser?.friends?.filter(
          (curr) =>
            curr.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
            curr.lastName.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }
  }, [searchText]);

  return (
    <>
      <div
        className={`md:flex md:flex-col gap-[6px] w-full md:w-1/4 h-[85vh] ${
          screen === "Left" ? "flex flex-col" : "hidden"
        }`}
      >
        <ChatsLeftHeader setSearchText={setSearchText} />
        <ChatMembersList
          friends={friends}
          setScreen={setScreen}
          sentMessage={sentMessage}
        />
      </div>
    </>
  );
};

export default ChatsLeftContainer;
