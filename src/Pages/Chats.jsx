import React, { useEffect, useRef, useState } from "react";
import NavBar from "../Components/NavBar";
import ChatsLeftContainer from "../Components/Chats/ChatsLeftContainer";
import ChatsRightContainer from "../Components/Chats/ChatsRightContainer";
//to use socket service in frontend , download socket.io-client library
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setChat, setOnlineUser } from "../Redux/ChatSlice";

const Chats = () => {
  const dispatch = useDispatch();
  //create a variable of socket so that we can use in different block
  const socket = useRef();
  const { _id } = useSelector((state) => state?.user?.loginUser);
  const { chat } = useSelector((state) => state?.chat);
  const [sentMessage, setSentMessage] = useState(null);
  const [recievedMessage, setRecievedMessage] = useState(null);
  const [screen, setScreen] = useState("Left");
  useEffect(() => {
    return () => {
      dispatch(setChat(null));
    };
  }, []);
  useEffect(() => {
    //change the title
    document.title = "Chats | FunBook";
    //scroll page to top
    window.scrollTo(0, 0);
    //create a socket on io circuit
    socket.current = io("http://localhost:8800"); //initialise the socket variable
    //add user to active user list by trigged an event "add-me-active-users-list"
    socket.current.emit("add-me-active-users-list", _id);
    //get active users and add in onlineUsers list.
    socket.current.on("get-active-users-list", (activeUsers) => {
      dispatch(setOnlineUser(activeUsers));
    });
  }, [_id]);

  useEffect(() => {
    //whenever a new message is sent,"send-message" event triggered
    if (sentMessage) {
      socket.current.emit("send-message", {
        ...sentMessage,
        recieverId: chat._id,
      });
    }
  }, [sentMessage]);

  useEffect(() => {
    //listen the event "recieve-message"
    socket.current.on("recieve-message", (data) => {
      setRecievedMessage(data);
    });
  }, [recievedMessage]);

  return (
    <>
      <div className="w-full px-2 md:px-16 bg-black text-white flex flex-col gap-2 md:gap-4">
        <div className="">
          <NavBar />
        </div>
        <div className="flex flex-row gap-5 w-full ">
          <ChatsLeftContainer
            screen={screen}
            setScreen={setScreen}
            sentMessage={sentMessage}
          />
          <ChatsRightContainer
            setSentMessage={setSentMessage}
            recievedMessage={recievedMessage}
            screen={screen}
            setScreen={setScreen}
          />
        </div>
      </div>
    </>
  );
};

export default Chats;
