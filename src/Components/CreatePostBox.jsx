import React, { useState } from "react";
import { FaImage } from "react-icons/fa6";
import { IoVideocam } from "react-icons/io5";
import { AiOutlineFileGif } from "react-icons/ai";
import { errorToast } from "../utils/Toast";
import { createPost, uploadMedia } from "../utils/APIRequest";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRefresh } from "../Redux/RefreshSlice";
import EmojiPicker from "emoji-picker-react";
import { MdEmojiEmotions } from "react-icons/md";
const CreatePostBox = ({
  user: { profileUrl, _id },
  // setRefresh, refresh
}) => {
  const [formData, setFormData] = useState({ description: "", mediaSrc: "" });
  const [loading, setLoading] = useState(false);
  const [mediaUpload, setMediaUpload] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [emojiOpen, setEmojiOpen] = useState(false);
  const { refresh } = useSelector((state) => state.refresh);
  const handleUploadMedia = async (e) => {
    const file = e.target.files[0];
    //upload image

    //if file is larger
    if (file.size > 10485760) {
      errorToast("File is too large");
      return;
    }

    //if file is smaller, upload file
    setMediaUpload(true); //media upload to be true
    const mediaSrc = await uploadMedia(file);
    //after upload image, media upload to be false
    setMediaUpload(false); //media upload to be false
    setFormData({ ...formData, mediaSrc });
  };

  const handleEmojiSelect = (emoji) => {
    setFormData({
      ...formData,
      description: formData.description + emoji.emoji,
    });
  };

  const handleCreatePost = async () => {
    //if there is no description
    if (!formData.description) {
      return errorToast("Description is required.");
    }
    //if post has description, then create post
    setLoading(true); //button loading to be true
    const success = await createPost(formData);
    setLoading(false); //button loading to be false
    if (success) {
      //if post is created successfully, then clear the form
      setFormData({ description: "", mediaSrc: "" });
      //refresh the page
      // setRefresh(!refresh);
      dispatch(setRefresh(!refresh));
      return;
    }
  };

  return (
    <>
      <div className="bg-zinc-950 rounded-sm shadow-xl p-4 flex flex-col gap-4 ">
        <div className="flex flex-row gap-2 items-center ">
          <img
            src={profileUrl}
            alt="User Avatar"
            className="w-12 h-12 rounded-full object-cover cursor-pointer"
            onClick={() => navigate(`/profile/${_id}`)}
          />
          <div className="flex flex-row justify-between bg-black rounded-2xl w-full items-center p-3 relative">
            <textarea
              type="text"
              value={formData.description}
              placeholder="What's in your mind"
              className="flex-1 text-sm font-medium outline-none  border-none rounded-2xl bg-black  placeholder:text-gray-500 text-gray-300 w-full border-0 resize-none max-h-16 overflow-y-auto"
              style={{ scrollBehavior: "smooth", scrollbarWidth: "none" }}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            ></textarea>
            <MdEmojiEmotions
              className="text-xl md:text-2xl cursor-pointer "
              onClick={() => setEmojiOpen(!emojiOpen)}
            />
            <div className="absolute  top-[50px] right-3">
              <EmojiPicker
                open={emojiOpen}
                rows={2}
                perRow={8}
                onEmojiClick={handleEmojiSelect}
                emojiSize={32}
                width={300}
                height={350}
              />
            </div>
          </div>
        </div>
        {mediaUpload ? (
          <div className="w-full min-h-28 flex justify-center items-center">
            <div className="mediaUploadLoader"></div>
          </div>
        ) : (
          formData.mediaSrc && (
            <img src={formData.mediaSrc} alt="Upload Media" />
          )
        )}
        <div className="flex flex-row justify-between items-center">
          <label className="flex flex-row gap-1 items-center text-ascent-2 text-sm font-semibold hover:text-blue cursor-pointer">
            <input
              type="file"
              className="hidden"
              onChange={(e) => handleUploadMedia(e)}
              accept=".jpg, .jpeg, .png,.avif"
            />
            <FaImage />
            <p>Photo</p>
          </label>
          <label className="flex flex-row gap-1 items-center text-ascent-2 text-sm font-semibold hover:text-blue cursor-pointer">
            <input
              type="file"
              className="hidden"
              onChange={(e) => handleUploadMedia(e)}
              accept=".mp4,.mkv"
            />
            <IoVideocam className="text-base" />
            <p>Video</p>
          </label>
          <label className="flex flex-row gap-1 items-center text-ascent-2 text-sm font-semibold hover:text-blue cursor-pointer">
            <input
              type="file"
              className="hidden"
              onChange={(e) => handleUploadMedia(e)}
              accept=".gif"
            />
            <AiOutlineFileGif className="text-base" />
            <p>GIF</p>
          </label>
          <button
            className="text-sm font-semibold bg-blue w-16 py-1 rounded-lg"
            onClick={handleCreatePost}
            disabled={loading ? "disabled" : ""}
          >
            {loading ? <div className="loader"></div> : "Post"}
          </button>
        </div>
      </div>
    </>
  );
};

export default CreatePostBox;
