import React, { useEffect, useState } from "react";
import BtnComponent from "../BtnComponent";
import { RxCross2 } from "react-icons/rx";
import { IoCamera } from "react-icons/io5";
import InputEmoji from "react-input-emoji";
import { errorToast } from "../../utils/Toast";
import { sendMessage, uploadMedia } from "../../utils/APIRequest";
import { useSelector } from "react-redux";
const MediaModalContainer = ({
  openModal,
  setOpenModal,
  uploadFile,
  setUploadFile,
  messages,
  setMessages,
  setSentMessage,
}) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [mediaSrc, setMediaSrc] = useState("");

  //get selected chat details
  const { chat } = useSelector((state) => state.chat);

  //when modal open, upload image
  useEffect(() => {
    //if file is selected
    if (uploadFile) {
      handleUploadMedia();
    }
  }, [uploadFile]);

  const handleUploadMedia = async () => {
    if (uploadFile.size > 10485760) {
      return errorToast("File is too large");
    }
    //loading to be true
    setLoading(true);
    //otherwise upload
    const imageURL = await uploadMedia(uploadFile);
    setMediaSrc(imageURL);
    //loading to be false
    setLoading(false);
  };

  const handleSubmit = async () => {
    //create formData
    let formData = {};
    if (message) {
      formData = { ...formData, message };
    }
    if (mediaSrc) {
      formData = { ...formData, mediaSrc };
    }
    //then sent message
    formData = { ...formData, recieverId: chat._id };
    //loading to be true
    const newMessage = await sendMessage(formData);
    if (newMessage) {
      setMessages([...messages, newMessage]);
      setSentMessage(newMessage);
      setMessage("");
      setOpenModal(false);
    }
    setLoading(false);
  };

  return (
    <>
      <div
        className={`bg-[#000000c1]  absolute top-0 left-0 w-full min-h-[85vh]
       ${
         !openModal ? "hidden" : "flex"
       }  justify-center  px-3 md:px-0  z-10 items-center`}
      >
        <div
          className=" bg-black px-[10px] md:px-5 py-5 rounded-md h-fit w-full md:w-1/3 flex flex-col gap-5 "
          style={{ scrollbarWidth: "none" }}
        >
          <div className="flex justify-between border-b-[1px] border-zinc-900 pb-2">
            <h1 className="text-white text-lg font-semibold">Send an Image</h1>
            <RxCross2
              className="text-xl font-bold cursor-pointer"
              onClick={() => setOpenModal(false)}
            />
          </div>
          <div className="flex flex-col gap-2">
            {/* Image */}
            <div className="h-56 relative flex items-center justify-center self-center">
              <>
                {uploadFile && (
                  <img
                    src={URL.createObjectURL(uploadFile) ?? ""}
                    alt="Avatar"
                    className="h-full w-full "
                  />
                )}
                <label className="absolute top-1 bg-gray-300 right-1 cursor-pointer text-sm  p-1 rounded-full text-black font-semibold hover:bg-gray-100 shadow-md">
                  <input
                    type="file"
                    className="hidden"
                    accept=".jpg, .jpeg, .png,.avif"
                    onChange={(e) => setUploadFile(e.target.files[0])}
                  />
                  <IoCamera className=" text-lg w-2 h-2 md:w-4 md:h-4  object-cover" />
                </label>
              </>
            </div>
            {/* Captions */}
            <div className="flex flex-col gap-1">
              <label className="text-base font-semibold px-2">Captions</label>
              <InputEmoji
                value={message}
                onChange={setMessage}
                placeholder="Type a message"
                background="black"
                color="white"
                placeholderColor="gray"
                borderRadius={16}
              />
            </div>
            {/* Button */}
            <div className="w-fit self-end">
              <BtnComponent
                label={"Submit"}
                handleBtn={handleSubmit}
                loading={loading}
                active={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MediaModalContainer;
