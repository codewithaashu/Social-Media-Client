import React, { useEffect, useRef, useState } from "react";
import ChatBubble from "./ChatBubble";
import { FiSend } from "react-icons/fi";
import InputEmoji from "react-input-emoji";
import { IoImages } from "react-icons/io5";
import { IoVideocam } from "react-icons/io5";
import { errorToast } from "../../utils/Toast";
import { getAllMessages, sendMessage } from "../../utils/APIRequest";
import { useSelector } from "react-redux";
import MediaModalContainer from "./MediaModalContainer";
const ChatBox = ({
  setSentMessage,
  recievedMessage,
  setShowOptionScreen,
  showOptionScreen,
}) => {
  const messagesEndRef = useRef();
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(null);
  const [loading, setLoding] = useState(false);
  const [uploadFile, setUplodadFile] = useState("");
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8]; //array used for skeleton
  const [chatBlockStatus, setChatBlockStatus] = useState(false);
  //get selected chat user details
  const { chat, chats } = useSelector((state) => state.chat);
  //get login user id details
  const { loginUser } = useSelector((state) => state?.user);

  //send message
  const handleOnEnter = async (message) => {
    //if user is block
    if (chatBlockStatus) {
      errorToast(
        `Unblock ${chat?.firstName + " " + chat?.lastName} to send a message`
      );
      return;
    }
    //if message is empty
    if (!message) {
      errorToast("Please write something...");
      return;
    }
    //set loading to e true
    setLoding(true);
    //if message is not empty then sent message
    const formData = { message, recieverId: chat._id };
    const newMessage = await sendMessage(formData);
    //set loading to be false
    setLoding(false);
    if (newMessage) {
      setMessages([...messages, newMessage]);
      setSentMessage(newMessage);
      setMessage("");
    }
  };

  //get all the conversations/messages between two users
  const handleApi = async () => {
    const res = await getAllMessages(chat._id);
    setMessages(res);
  };

  useEffect(() => {
    const isBlock = chats.find((curr) =>
      curr?.members?.includes(chat?._id)
    )?.isBlock;
    setChatBlockStatus(isBlock);
    handleApi();
  }, [chat, chats]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (recievedMessage !== null) {
      setMessages([...messages, recievedMessage]);
    }
  }, [recievedMessage]);

  //uploadMedia
  const handleUploadMedia = async (file) => {
    //if file size is larger
    if (file?.size > 10485760) {
      return errorToast("File is too large");
    }
    //set upload file
    setUplodadFile(file);
    //open modal
    setOpenModal(true);
  };

  return (
    <>
      <div className="bg-zinc-950 rounded-b-lg shadow-xl h-[75vh] flex flex-col justify-between">
        {/* Chat Box */}
        {messages ? (
          messages.length === 0 ? (
            <div className="w-full py-10 flex justify-center items-center">
              <h1 className="text-base font-semibold text-gray-300 text-center">
                No messages yet. Start conversation with{" "}
                <span className="text-gray-200">
                  {chat.firstName + " " + chat.lastName}
                </span>
              </h1>
            </div>
          ) : (
            <div
              className="py-4 px-3 flex flex-col gap-2 max-h-[65vh] overflow-y-scroll "
              style={{ scrollbarWidth: "none", scrollBehavior: "smooth" }}
            >
              {messages?.map(
                ({ message, sender, createdAt, mediaSrc }, index) => {
                  return (
                    <ChatBubble
                      imgSrc={
                        loginUser._id !== sender
                          ? chat.profileUrl
                          : loginUser.profileUrl
                      }
                      message={message}
                      reciever={loginUser._id !== sender}
                      key={index}
                      mediaSrc={mediaSrc}
                      createdAt={createdAt}
                    />
                  );
                }
              )}
              <div ref={messagesEndRef} />
            </div>
          )
        ) : (
          <div className="py-4 px-3">
            {arr.map((index) => {
              return (
                <div
                  className={`chat ${
                    index % 2 === 0 ? "chat-start" : "chat-end"
                  }`}
                  key={index}
                >
                  <div className="chat-image avatar">
                    <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
                  </div>
                  <div className="chat-bubble skeleton h-4 w-36"></div>
                </div>
              );
            })}
          </div>
        )}
        {chatBlockStatus && (
          <p
            className="text-xs font-semibold px-4 py-1 cursor-pointer rounded-xl text-center bg-zinc-800 w-fit self-center my-2 text-gray-300"
            onClick={() => setShowOptionScreen(!showOptionScreen)}
          >
            You block this user. Tap to unblock.
          </p>
        )}
        {/* Input Box */}
        <div className="flex flex-row items-center gap-3 w-full p-3">
          <div className="flex flex-row gap-3 text-xl">
            <label>
              <input
                type="file"
                accept=".jpg,.png,.jpeg,.heif,.avif"
                hidden
                onChange={(e) => handleUploadMedia(e.target.files[0])}
              />
              <IoImages className="cursor-pointer" />
            </label>
          </div>
          <div className="w-full">
            <InputEmoji
              value={message}
              onChange={setMessage}
              onEnter={handleOnEnter}
              placeholder="Type a message"
              background="black"
              color="white"
              placeholderColor="gray"
              borderRadius={16}
            />
          </div>
          <button
            className="p-[10px] rounded-lg bg-blue w-fit"
            onClick={() => handleOnEnter(message)}
            disabled={loading}
          >
            {loading ? (
              <div className="loader max-w-6 h-6"></div>
            ) : (
              <FiSend className="text-xl" />
            )}
          </button>
        </div>
      </div>

      <MediaModalContainer
        openModal={openModal}
        setOpenModal={setOpenModal}
        uploadFile={uploadFile}
        setUploadFile={setUplodadFile}
        messages={messages}
        setMessages={setMessages}
        setSentMessage={setSentMessage}
      />
    </>
  );
};

export default ChatBox;
